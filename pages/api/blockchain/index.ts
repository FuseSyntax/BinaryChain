import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { getBlockchainInstance } from '../../../lib/blockchainInstance';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const blocks = await prisma.block.findMany({
        include: { transactions: true },
        orderBy: { index: 'asc' },
      });
      console.log(`Fetched ${blocks.length} blocks from DB`);
      res.status(200).json({ chain: blocks });
    } catch (error) {
      console.error('Error fetching blocks:', error);
      res.status(500).json({ error: 'Failed to fetch blockchain' });
    }
  } else if (req.method === 'POST') {
    const { miningRewardAddress } = req.body;
    if (!miningRewardAddress) {
      return res.status(400).json({ error: 'Mining reward address required' });
    }
    try {
      const blockchain = await getBlockchainInstance();
      await blockchain.minePendingTransactions(miningRewardAddress);
      const newBlock = blockchain.getLatestBlock();
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
      }).then(() => console.log(`Saved block to DB: Index ${newBlock.index}`));
      res.status(200).json({ message: 'Block mined successfully', block: newBlock });
    } catch (error: unknown) {
      console.error('Error mining block:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to mine block';
      if (errorMessage.includes('Unique constraint')) {
        res.status(400).json({ error: 'Block index already exists' });
      } else {
        res.status(500).json({ error: errorMessage });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}