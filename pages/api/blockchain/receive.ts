import type { NextApiRequest, NextApiResponse } from 'next';
import { blockchainInstance } from '../../../lib/blockchainInstance';
import { Block } from '../../../lib/block';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

    const accepted = blockchainInstance.receiveBlock(newBlock);
    if (accepted) {
      res.status(200).json({ message: 'Block received and added successfully.' });
    } else {
      res.status(400).json({ error: 'Invalid block received.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}