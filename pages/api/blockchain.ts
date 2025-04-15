// pages/api/blockchain.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Blockchain } from '../../lib/blockchain';

let myBlockchain = new Blockchain();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ chain: myBlockchain.chain });
  } else if (req.method === 'POST') {
    const { miningRewardAddress } = req.body;
    if (!miningRewardAddress) {
      res.status(400).json({ error: 'miningRewardAddress missing' });
      return;
    }
    myBlockchain.minePendingTransactions(miningRewardAddress);
    res.status(200).json({ chain: myBlockchain.chain });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
