import { Blockchain } from './blockchain';
import { prisma } from './prisma';
import { Block } from './block';
import { Transaction } from './transaction';

async function initializeBlockchain(): Promise<Blockchain> {
  const blockchain = new Blockchain();

  // Load existing blocks from the database
  const dbBlocks = await prisma.block.findMany({
    include: { transactions: true },
    orderBy: { index: 'asc' },
  });

  if (dbBlocks.length > 0) {
    // Map database blocks to Block instances
    blockchain.chain = dbBlocks.map((dbBlock) => {
      const block = new Block(
        dbBlock.index,
        new Date(dbBlock.timestamp).getTime(),
        dbBlock.transactions.map((tx) => new Transaction(tx.fromAddress, tx.toAddress, tx.amount)),
        dbBlock.previousHash
      );
      block.hash = dbBlock.hash;
      block.nonce = dbBlock.nonce;
      return block;
    });
    console.log(`Loaded ${blockchain.chain.length} blocks from database`);
  } else {
    console.log('No blocks in database, starting with genesis block');
  }

  return blockchain;
}

export const blockchainInstance = await initializeBlockchain();