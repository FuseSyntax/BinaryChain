// lib/transaction.ts
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
  }
  