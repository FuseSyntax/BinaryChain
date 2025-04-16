// pages/status.tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  CubeIcon, 
  ClockIcon, 
  LinkIcon, 
  DocumentTextIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  FingerPrintIcon
} from '@heroicons/react/24/outline';

interface Block {
  index: number;
  timestamp: number;
  transactions: any[];
  previousHash: string;
  hash: string;
  nonce: number;
}

const Status = () => {
  const [chain, setChain] = useState<Block[]>([]);

  const fetchChain = async () => {
    const res = await fetch('/api/blockchain');
    const data = await res.json();
    setChain(data.chain);
  };

  useEffect(() => { fetchChain(); }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Blockchain Explorer
            </h1>
            <motion.button 
              onClick={fetchChain}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all"
            >
              <CubeIcon className="w-5 h-5" />
              Refresh Chain
            </motion.button>
          </div>

          <div className="space-y-6">
            {chain.map((block, index) => (
              <motion.div
                key={block.hash}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 bg-gray-700/30 rounded-xl border border-gray-600"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-400/10 rounded-lg">
                    <CubeIcon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    Block #{block.index}
                  </h2>
                  {index === 0 && (
                    <span className="px-3 py-1 text-xs bg-emerald-400/20 text-emerald-400 rounded-full">
                      Genesis Block
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">
                      {new Date(block.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FingerPrintIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">
                      Nonce: {block.nonce}
                    </span>
                  </div>

                  <div className="col-span-full">
                    <div className="flex items-start gap-2">
                      <LinkIcon className="w-5 h-5 text-gray-400 mt-1" />
                      <div className="flex-1">
                        <p className="text-gray-300 break-all">
                          <span className="font-semibold">Current Hash:</span> {block.hash}
                        </p>
                        <p className="text-gray-300 break-all mt-1">
                          <span className="font-semibold">Previous Hash:</span> {block.previousHash || 'None'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5 text-emerald-400" />
                    Transactions ({block.transactions.length})
                  </h3>

                  {block.transactions.length > 0 ? (
                    <div className="space-y-3">
                      {block.transactions.map((tx, txIndex) => (
                        <div 
                          key={txIndex}
                          className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div className="flex items-center gap-2">
                              <UserCircleIcon className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-300 break-all">
                                From: {tx.fromAddress || 'System'}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <UserCircleIcon className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-300 break-all">
                                To: {tx.toAddress}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
                              <span className="text-emerald-400 font-semibold">
                                {tx.amount.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-800/20 rounded-lg text-center text-gray-400">
                      No transactions in this block
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Status;