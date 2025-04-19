// This file defines the SmartContract interface and a simple implementation of it.
// It includes a method to execute the contract logic based on a transaction.
import { Transaction } from './transaction';

export interface SmartContract {
  id: string;
  code: string;
  execute(transaction: Transaction): boolean;
}

export class SimpleContract implements SmartContract {
  id: string;
  code: string;

  constructor(id: string, code: string) {
    this.id = id;
    this.code = code;
  }

  execute(transaction: Transaction): boolean {
    try {
      if (this.code === 'restrictAmount' && transaction.amount <= 0) {
        return false; // Reject transactions with non-positive amounts
      }
      return true;
    } catch (error) {
      console.error('Contract execution failed:', error);
      return false;
    }
  }
}

export class TimeLockContract implements SmartContract {
    id: string;
    code: string;
    unlockTime: number;
  
    constructor(id: string, unlockTime: number) {
      this.id = id;
      this.code = 'timeLock';
      this.unlockTime = unlockTime;
    }
  
    execute(): boolean {
      return Date.now() >= this.unlockTime;
    }
  }
