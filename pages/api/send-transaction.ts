// pages/api/send-transaction.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Wallet } from '../../lib/wallet';
import { Transaction } from '../../lib/transaction';
import { blockchainInstance } from '../../lib/blockchainInstance';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Expecting to receive "toAddress" and "amount" from the request body
    const { toAddress, amount } = req.body;

    if (!toAddress || !amount) {
      return res.status(400).json({ error: 'Missing toAddress or amount in request body' });
    }

    try {
      // Create a wallet instance.
      // In production, you might load an existing wallet from secure storage.
      const senderWallet = new Wallet();

      // Create the transaction using the sender's public key
      const tx = new Transaction(senderWallet.publicKey, toAddress, parseFloat(amount));

      // Sign the transaction using the sender's wallet private key
      senderWallet.signTransaction(tx);

      // Add the signed transaction to the blockchain instance
      blockchainInstance.addTransaction(tx);

      // Return success response
      res.status(200).json({ message: 'Transaction successfully signed and added.', transaction: tx });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Please use POST.' });
  }
}
