'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CpuChipIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { getOrCreateWallet } from '../lib/walletPersistence';

const Mine = () => {
  const [wallet, setWallet] = useState<{ publicKey: string } | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Load wallet on client only
  useEffect(() => {
    const stored = getOrCreateWallet();
    setWallet(stored);
  }, []);

  const mineBlock = async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      const res = await fetch('/api/blockchain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ miningRewardAddress: wallet.publicKey }),
      });
      const data = await res.json();
      setMessage(data.message || 'Block mined successfully!');
    } catch (err) {
      setMessage((err instanceof Error ? err.message : 'Unknown error') || 'Error mining block.');
    } finally {
      setLoading(false);
    }
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
                  value={wallet?.publicKey || ''}
                  readOnly
                  placeholder="Generating wallet..."
                  className="bg-transparent w-full text-gray-200 placeholder-gray-500"
                />
              </div>
            </div>

            <motion.button
              onClick={mineBlock}
              whileHover={{ scale: wallet && !loading ? 1.05 : 1 }}
              disabled={!wallet || loading}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all \${
                wallet && !loading
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-gray-600 cursor-not-allowed text-gray-400'
              }`}
            >
              <CpuChipIcon className="w-5 h-5" />
              {loading ? 'Mining...' : 'Start Mining'}
            </motion.button>

            {message && (
              <div className="p-4 rounded-lg bg-emerald-400/10 border border-emerald-400/30">
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
