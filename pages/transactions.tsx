'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, WalletIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Transaction } from '../lib/transaction';
import { getOrCreateWallet } from '../lib/walletPersistence';

const Transactions = () => {
  const [wallet, setWallet] = useState<{ publicKey: string; signTransaction: (tx: Transaction) => void } | null>(null);
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // Load wallet from localStorage on client only
  useEffect(() => {
    const w = getOrCreateWallet();
    setWallet(w);
  }, []);

  // Fetch pending transactions
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch('/api/transaction');
        const data = await res.json();
        setPending(data.transactions || []);
      } catch {
        setPending([]);
      }
    };
    fetchPending();
  }, []);

  const submitTransaction = async () => {
    if (!wallet) {
      setMessage('Wallet not loaded yet');
      return;
    }
    if (!toAddress || !amount || parseFloat(amount) <= 0) {
      setMessage('Please provide a valid recipient address and amount greater than 0');
      return;
    }

    setLoading(true);
    setMessage('');

    const tx = new Transaction(wallet.publicKey, toAddress, parseFloat(amount));
    wallet.signTransaction(tx);

    try {
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
      if (!res.ok) throw new Error(data.error || 'Transaction failed');

      setMessage('Transaction added to mempool!');
      // Refresh pending list
      const updated = await fetch('/api/transaction');
      const updatedData = await updated.json();
      setPending(updatedData.transactions || []);
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:min-h-screen bg-gray-900 md:p-8 md:mt-20 mx-4 mt-24 mb-10">
      <div className="max-w-4xl mx-auto">
        {/* New Transaction Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-2xl md:p-8 p-4 border border-gray-700 shadow-2xl mb-8"
        >
          <h1 className="md:text-4xl text-2xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            New Transaction
          </h1>

          <div className="space-y-6">
            {/* Sender Address */}
            <div>
              <label className="text-gray-300 mb-2 block">Sender Address</label>
              <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-3 border border-gray-600">
                <WalletIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={wallet?.publicKey || ''}
                  readOnly
                  placeholder="Loading wallet..."
                  className="bg-transparent w-full text-gray-200 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Recipient Address */}
            <div>
              <label className="text-gray-300 mb-2 block">Recipient Address</label>
              <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-3 border border-gray-600">
                <WalletIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  placeholder="0x..."
                  className="bg-transparent w-full text-gray-200 placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="text-gray-300 mb-2 block">Amount</label>
              <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-3 border border-gray-600">
                <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent w-full text-gray-200 placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              onClick={submitTransaction}
              whileHover={{ scale: !loading ? 1.05 : 1 }}
              disabled={loading || !wallet}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all \${
                !loading && wallet
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-gray-600 cursor-not-allowed text-gray-400'
              }`}
            >
              <ArrowUpIcon className="w-5 h-5" />
              {loading ? 'Sending...' : 'Broadcast Transaction'}
            </motion.button>

            {/* Feedback Message */}
            {message && (
              <div
                className={`p-4 rounded-lg \${
                  message.startsWith('Error')
                    ? 'bg-red-400/10 border-red-400/30 text-red-400'
                    : 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400'
                }`}
              >
                <p>{message}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Pending Transactions List */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Pending Transactions</h2>
          {pending.length === 0 ? (
            <p className="text-gray-400">No pending transactions</p>
          ) : (
            <ul className="space-y-4">
              {pending.map((tx, idx) => (
                <li key={idx} className="p-4 bg-gray-700 rounded-lg">
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
