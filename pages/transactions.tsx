'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowUpIcon, WalletIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Transaction } from '../lib/transaction';
import { getOrCreateWallet } from '../lib/walletPersistence';

const Transactions = () => {
  const [wallet] = useState(() => getOrCreateWallet());
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchPendingTransactions = async () => {
      const res = await fetch('/api/transaction');
      const data = await res.json();
      setPendingTransactions(data.transactions || []);
    };
    fetchPendingTransactions();
  }, []);

  const submitTransaction = async () => {
    const tx = new Transaction(wallet.publicKey, toAddress, parseFloat(amount));
    wallet.signTransaction(tx);

    const res = await fetch('/api/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromAddress: tx.fromAddress,
        toAddress: tx.toAddress,
        amount: tx.amount,
        signature: tx.signature,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(`Error: ${data.error}`);
    } else {
      setMessage('Transaction added to mempool!');
      const res = await fetch('/api/transaction');
      const updatedData = await res.json();
      setPendingTransactions(updatedData.transactions || []);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl mb-8"
        >
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            New Transaction
          </h1>

          <div className="space-y-6">
            <div>
              <label className="text-gray-300 mb-2 block">Sender Address</label>
              <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-3 border border-gray-600">
                <WalletIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={wallet.publicKey}
                  readOnly
                  className="bg-transparent w-full text-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 mb-2 block">Recipient Address</label>
              <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-3 border border-gray-600">
                <WalletIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  className="bg-transparent w-full text-gray-200 placeholder-gray-500 focus:outline-none"
                  placeholder="0x..."
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 mb-2 block">Amount</label>
              <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-3 border border-gray-600">
                <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-transparent w-full text-gray-200 placeholder-gray-500 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            <motion.button
              onClick={submitTransaction}
              whileHover={{ scale: 1.05 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all"
            >
              <ArrowUpIcon className="w-5 h-5" />
              Broadcast Transaction
            </motion.button>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.startsWith('Error')
                    ? 'bg-red-400/10 border-red-400/30'
                    : 'bg-emerald-400/10 border-emerald-400/30'
                }`}
              >
                <p className={message.startsWith('Error') ? 'text-red-400' : 'text-emerald-400'}>
                  {message}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Pending Transactions</h2>
          {pendingTransactions.length === 0 ? (
            <p className="text-gray-400">No pending transactions</p>
          ) : (
            <ul className="space-y-4">
              {pendingTransactions.map((tx, index) => (
                <li key={index} className="p-4 bg-gray-700 rounded-lg">
                  <p>From: {tx.fromAddress}</p>
                  <p>To: {tx.toAddress}</p>
                  <p>Amount: {tx.amount}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;