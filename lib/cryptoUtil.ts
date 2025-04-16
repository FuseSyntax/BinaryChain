// lib/cryptoUtil.ts
import crypto from 'crypto';
import elliptic from 'elliptic';

const EC = elliptic.ec;
export const ec = new EC('secp256k1');

export function calculateHash(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export function verifySignature(publicKey: string, signature: string, dataHash: string): boolean {
  const key = ec.keyFromPublic(publicKey, 'hex');
  return key.verify(dataHash, signature);
}
