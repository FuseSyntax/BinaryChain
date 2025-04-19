import type { NextApiRequest, NextApiResponse } from 'next';
import { blockchainInstance } from '../../../lib/blockchainInstance';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const blocks = await prisma.block.findMany({
      include: { transactions: true },
      orderBy: { index: 'asc' },
    });
    res.status(200).json({ chain: blocks });
  } else if (req.method === 'POST') {
    const { miningRewardAddress } = req.body;
    if (!miningRewardAddress) {
      return res.status(400).json({ error: 'Mining reward address required' });
    }
    try {
      blockchainInstance.minePendingTransactions(miningRewardAddress);
      const newBlock = blockchainInstance.getLatestBlock();
      await prisma.block.create({
        data: {
          index: newBlock.index,
          timestamp: new Date(newBlock.timestamp),
          hash: newBlock.hash,
          previousHash: newBlock.previousHash,
          nonce: newBlock.nonce,
          transactions: {
            create: newBlock.transactions.map((tx) => ({
              fromAddress: tx.fromAddress,
              toAddress: tx.toAddress,
              amount: tx.amount,
              signature: tx.signature,
            })),
          },
        },
      });
      res.status(200).json({ message: 'Block mined successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to mine block' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
