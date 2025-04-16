// pages/api/transaction.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Blockchain } from '../../lib/blockchain';
import { Transaction } from '../../lib/transaction';

let myBlockchain = new Blockchain();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fromAddress, toAddress, amount } = req.body;
    if (!fromAddress || !toAddress || amount === undefined) {
      res.status(400).json({ error: 'Missing transaction fields' });
      return;
    }
    const tx = new Transaction(fromAddress, toAddress, amount);
    try {
      myBlockchain.addTransaction(tx);
      res.status(200).json({
        message: 'Transaction added',
        pendingTransactions: myBlockchain.pendingTransactions
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
