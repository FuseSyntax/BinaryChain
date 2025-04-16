// lib/block.ts
import { calculateHash } from './cryptoUtil';
import { Transaction } from './transaction';

export class Block {
  public index: number;
  public timestamp: number;
  public transactions: Transaction[];
  public previousHash: string;
  public hash: string;
  public nonce: number;

  constructor(
    index: number,
    timestamp: number,
    transactions: Transaction[],
    previousHash: string = ''
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateBlockHash();
  }

  calculateBlockHash(): string {
    return calculateHash(
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.nonce
    );
  }

  // Simple Proof-of-Work: adjust difficulty by requiring a hash starting with x zeros.
  mineBlock(difficulty: number): void {
    const target = Array(difficulty + 1).join('0');
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateBlockHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }
}
