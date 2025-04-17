import type { NextApiRequest, NextApiResponse } from 'next';
import { blockchainInstance } from '../../../lib/blockchainInstance';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return the current blockchain state
    res.status(200).json({ chain: blockchainInstance.chain });
  } else if (req.method === 'POST') {
    const { miningRewardAddress } = req.body;
    if (!miningRewardAddress) {
      return res.status(400).json({ error: 'Mining reward address required' });
    }
    try {
      blockchainInstance.minePendingTransactions(miningRewardAddress);
      res.status(200).json({ message: 'Block mined successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to mine block' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}