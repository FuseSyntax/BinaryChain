'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { CpuChipIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { getOrCreateWallet } from '../lib/walletPersistence';

const Mine = () => {
  const [wallet] = useState(() => getOrCreateWallet());
  const [message, setMessage] = useState('');

  const mineBlock = async () => {
    const res = await fetch('/api/blockchain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ miningRewardAddress: wallet.publicKey }),
    });
    const data = await res.json();
    setMessage(data.message || 'Block mined successfully!');
  };

  return (
    <div className="md:min-h-screen bg-gray-900 md:p-8 md:mt-20 mx-4 mt-24 mb-10">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-2xl md:p-8 p-4 border border-gray-700 shadow-2xl"
        >
          <h1 className="md:text-4xl text-2xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Mine Block
          </h1>

          <div className="space-y-6">
            <div>
              <label className="text-gray-300 mb-2 block">Reward Address</label>
              <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-3 border border-gray-600">
                <SparklesIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={wallet.publicKey}
                  readOnly
                  className="bg-transparent w-full text-gray-200"
                />
              </div>
            </div>

            <motion.button
              onClick={mineBlock}
              whileHover={{ scale: 1.05 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all"
            >
              <CpuChipIcon className="w-5 h-5" />
              Start Mining
            </motion.button>

            {message && (
              <div className="p-4 rounded-lg bg-emerald-400/10 border-emerald-400/30">
                <p className="text-emerald-400">{message}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Mine;