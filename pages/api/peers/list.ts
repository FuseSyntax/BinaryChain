import type { NextApiRequest, NextApiResponse } from 'next';
import { blockchainInstance } from '../../../lib/blockchainInstance';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const peers = blockchainInstance.getPeers();
    res.status(200).json({ peers });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}