import type { NextApiRequest, NextApiResponse } from 'next';
import { getBlockchainInstance } from '../../../lib/blockchainInstance';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const blockchainInstance = await getBlockchainInstance();
    const peers = blockchainInstance.getPeers();
    res.status(200).json({ peers });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}