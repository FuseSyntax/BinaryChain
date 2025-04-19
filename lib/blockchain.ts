import { Block } from './block';
import { Transaction } from './transaction';
import { SmartContract, SimpleContract } from './contract';

export class Blockchain {
  public chain: Block[];
  public difficulty: number;
  public pendingTransactions: Transaction[];
  public miningReward: number;
  public peers: Set<string>;
  private contracts: Map<string, SmartContract>;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
    this.pendingTransactions = [];
    this.miningReward = 50;
    this.peers = new Set();
    this.contracts = new Map();
    this.contracts.set('restrictAmount', new SimpleContract('restrictAmount', 'restrictAmount'));
  }

  createGenesisBlock(): Block {
    return new Block(0, Date.now(), [], '0');
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addPeer(peerUrl: string): void {
    this.peers.add(peerUrl);
    this.discoverPeers(peerUrl);
  }

  getPeers(): string[] {
    return Array.from(this.peers);
  }

  async discoverPeers(peerUrl: string): Promise<void> {
    try {
      const res = await fetch(`${peerUrl}/api/peers/list`);
      const data = await res.json();
      for (const peer of data.peers) {
        if (!this.peers.has(peer) && peer !== window.location.origin) {
          this.peers.add(peer);
        }
      }
    } catch (error) {
      console.error('Error discovering peers:', error);
    }
  }

  async syncChain(): Promise<void> {
    for (const peer of this.peers) {
      try {
        const res = await fetch(`${peer}/api/blockchain`);
        const data = await res.json();
        const peerChain = data.chain;
        if (peerChain.length > this.chain.length && this.isValidChain(peerChain)) {
          this.chain = peerChain;
          console.log(`Synchronized with longer chain from ${peer}`);
        }
      } catch (error) {
        console.error('Error syncing with peer:', peer, error);
      }
    }
  }

  isValidChain(chain: Block[]): boolean {
    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i];
      const previousBlock = chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateBlockHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  async broadcastBlock(block: Block): Promise<void> {
    for (const peer of this.peers) {
      try {
        await fetch(`${peer}/api/blockchain/receive`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(block),
        });
      } catch (error) {
        console.error('Error broadcasting block to peer:', peer, error);
      }
    }
  }

  minePendingTransactions(miningRewardAddress: string): void {
    const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
    this.pendingTransactions.push(rewardTx);

    const block = new Block(
      this.chain.length,
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );

    block.mineBlock(this.difficulty);
    console.log('Block successfully mined!');

    this.chain.push(block);
    this.pendingTransactions = [];

    this.broadcastBlock(block);
    this.syncChain();
  }

  addTransaction(transaction: Transaction): void {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('Transaction must include from and to address');
    }

    let tx: Transaction;
    if (typeof transaction.isValid !== 'function') {
      tx = new Transaction(transaction.fromAddress, transaction.toAddress, transaction.amount);
      tx.signature = transaction.signature;
    } else {
      tx = transaction;
    }

    if (!tx.isValid()) {
      throw new Error('Invalid transaction signature');
    }

    const contract = this.contracts.get('restrictAmount');
    if (contract && !contract.execute(tx)) {
      throw new Error('Transaction rejected by smart contract: Amount must be greater than 0');
    }

    this.pendingTransactions.push(tx);
  }

  getBalanceOfAddress(address: string): number {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  }
  

  receiveBlock(newBlock: Block): boolean {
    const latestBlock = this.getLatestBlock();

    if (newBlock.previousHash !== latestBlock.hash) {
      console.error("Received block's previous hash does not match the current chain.");
      return false;
    }

    if (newBlock.hash !== newBlock.calculateBlockHash()) {
      console.error("Received block's hash is invalid.");
      return false;
    }

    this.chain.push(newBlock);
    console.log('Block received from peer and added to the chain.');
    return true;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateBlockHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
