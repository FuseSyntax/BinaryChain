// lib/database.ts (example)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Transaction {
  fromAddress: string;
  toAddress: string;
  amount: number;
  signature: string;
}

interface Block {
  index: number;
  timestamp: string | Date;
  hash: string;
  previousHash: string;
  nonce: number;
  transactions: Array<Transaction>;
}

export async function saveBlock(block: Block) {
  return prisma.block.create({
    data: {
      index: block.index,
      timestamp: new Date(block.timestamp),
      hash: block.hash,
      previousHash: block.previousHash,
      nonce: block.nonce,
      transactions: {
        create: block.transactions.map((tx: Transaction) => ({
          fromAddress: tx.fromAddress,
          toAddress: tx.toAddress,
          amount: tx.amount,
          signature: tx.signature,
        })),
      },
    },
  });
}

export async function getBlockchain() {
  return prisma.block.findMany({
    include: { transactions: true },
    orderBy: { index: 'asc' },
  });
}
