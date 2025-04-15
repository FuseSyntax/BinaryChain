// components/TransactionList.tsx
import React from 'react';
import { Transaction } from '../lib/transaction';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Transactions</h2>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index} className="border p-2 my-1">
            <p>From: {tx.fromAddress || 'System'}</p>
            <p>To: {tx.toAddress}</p>
            <p>Amount: {tx.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
