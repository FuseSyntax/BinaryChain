// lib/transaction.ts
import { calculateHash, verifySignature } from './cryptoUtil';

export class Transaction {
  public fromAddress: string | null;
  public toAddress: string;
  public amount: number;
  public signature?: string;

  constructor(fromAddress: string | null, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  // Produce a unique hash of this transaction's data
  calculateHash(): string {
    return calculateHash(`${this.fromAddress}${this.toAddress}${this.amount}`);
  }

  // Validate the transaction's signature (or allow mining rewards)
  isValid(): boolean {
    // Mining rewards have no fromAddress → always valid
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      // No signature attached
      return false;
    }

    return verifySignature(
      this.fromAddress,
      this.signature,
      this.calculateHash()
    );
  }
}
