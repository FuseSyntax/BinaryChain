// pages/transactions.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpIcon, WalletIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const Transactions = () => {
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
    setMessage(data.error ? `Error: ${data.error}` : 'Transaction added to mempool!');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl"
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
                  value={fromAddress}
                  onChange={(e) => setFromAddress(e.target.value)}
                  className="bg-transparent w-full text-gray-200 placeholder-gray-500 focus:outline-none"
                  placeholder="0x..."
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
              <div className={`p-4 rounded-lg ${
                message.startsWith('Error') 
                  ? 'bg-red-400/10 border-red-400/30' 
                  : 'bg-emerald-400/10 border-emerald-400/30'
              }`}>
                <p className={message.startsWith('Error') ? 'text-red-400' : 'text-emerald-400'}>
                  {message}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Transactions;