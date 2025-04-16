// lib/wallet.ts
import { ec } from './cryptoUtil';
import { Transaction } from './transaction';
import crypto from 'crypto';

export class Wallet {
  public keyPair: elliptic.ec.KeyPair;
  public privateKey: string;
  public publicKey: string;

  constructor() {
    this.keyPair = ec.genKeyPair();
    this.privateKey = this.keyPair.getPrivate('hex');
    this.publicKey = this.keyPair.getPublic('hex');
  }

  signTransaction(transaction: Transaction): void {
    const dataHash = this.calculateTransactionHash(transaction);
    const signature = this.keyPair.sign(dataHash, 'base64');
    transaction.signature = signature.toDER('hex');
  }

  calculateTransactionHash(transaction: Transaction): string {
    const data = `${transaction.fromAddress}${transaction.toAddress}${transaction.amount}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}
