import type { NextApiRequest, NextApiResponse } from 'next';
import { getBlockchainInstance } from '../../lib/blockchainInstance';
import { Transaction } from '../../lib/transaction';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fromAddress, toAddress, amount, signature } = req.body;
    if (!fromAddress || !toAddress || !amount || !signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const blockchain = await getBlockchainInstance();
      const tx = new Transaction(fromAddress, toAddress, amount);
      tx.signature = signature;
      blockchain.addTransaction(tx);
      res.status(200).json({ message: 'Transaction added to mempool' });
    } catch (error) {
      console.error('Error adding transaction:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Failed to add transaction' });
    }
  } else if (req.method === 'GET') {
    try {
      const blockchain = await getBlockchainInstance();
      const pendingTransactions = blockchain.pendingTransactions;
      res.status(200).json({ transactions: pendingTransactions });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}