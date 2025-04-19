import type { NextApiRequest, NextApiResponse } from 'next';
import { getBlockchainInstance } from '../../../lib/blockchainInstance';
import { Block } from '../../../lib/block';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newBlockData = req.body;
    const newBlock = new Block(
      newBlockData.index,
      newBlockData.timestamp,
      newBlockData.transactions,
      newBlockData.previousHash
    );
    newBlock.hash = newBlockData.hash;
    newBlock.nonce = newBlockData.nonce;

    const blockchainInstance = await getBlockchainInstance();
    const accepted = blockchainInstance.receiveBlock(newBlock);
    if (accepted) {
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
      res.status(200).json({ message: 'Block received and added successfully' });
    } else {
      res.status(400).json({ error: 'Invalid block received' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
