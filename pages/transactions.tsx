// pages/transactions.tsx
import React, { useState } from 'react';

const Transactions: React.FC = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const submitTransaction = async () => {
    const res = await fetch('/api/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromAddress, toAddress, amount: parseFloat(amount) }),
    });
    const data = await res.json();
    if (data.error) {
      setMessage(`Error: ${data.error}`);
    } else {
      setMessage('Transaction added!');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">New Transaction</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="From Address"
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="To Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button onClick={submitTransaction} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send Transaction
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Transactions;
