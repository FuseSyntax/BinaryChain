import type { NextApiRequest, NextApiResponse } from 'next';
import { blockchainInstance } from '../../lib/blockchainInstance';
import { Transaction } from '../../lib/transaction';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fromAddress, toAddress, amount, signature } = req.body;
    if (!fromAddress || !toAddress || !amount || !signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const tx = new Transaction(fromAddress, toAddress, amount);
    tx.signature = signature;

    try {
      blockchainInstance.addTransaction(tx);
      res.status(200).json({ message: 'Transaction added to mempool' });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  } else if (req.method === 'GET') {
    const pendingTransactions = blockchainInstance.pendingTransactions;
    res.status(200).json({ transactions: pendingTransactions });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}