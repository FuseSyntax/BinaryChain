import { Blockchain } from './blockchain';
import { prisma } from './prisma';
import { Block } from './block';
import { Transaction } from './transaction';

let blockchainInstance: Blockchain | null = null;

export async function getBlockchainInstance(): Promise<Blockchain> {
  if (blockchainInstance) {
    return blockchainInstance;
  }

  const blockchain = new Blockchain();

  // Load existing blocks from the database
  try {
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
          dbBlock.transactions.map((tx) => {
            const transaction = new Transaction(tx.fromAddress, tx.toAddress, tx.amount);
            transaction.signature = tx.signature ?? undefined; // Set signature after creation
            return transaction;
          }),
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
  } catch (error) {
    console.error('Error loading blocks from database:', error);
  }

  blockchainInstance = blockchain;
  return blockchainInstance;
}