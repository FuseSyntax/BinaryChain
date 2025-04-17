// lib/database.ts (example)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function saveBlock(block: any) {
  return prisma.block.create({
    data: {
      index: block.index,
      timestamp: new Date(block.timestamp),
      hash: block.hash,
      previousHash: block.previousHash,
      nonce: block.nonce,
      transactions: {
        create: block.transactions.map((tx: any) => ({
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
