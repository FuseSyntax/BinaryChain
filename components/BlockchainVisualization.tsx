'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Blockchain } from '../lib/blockchain';
import { Block } from '../lib/block';

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -100 }
};

interface VisualizationProps {
  blockchain: Blockchain;
}

const BlockchainVisualization = ({ blockchain }: VisualizationProps) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [newBlockHighlight, setNewBlockHighlight] = useState<string | null>(null);

  useEffect(() => {
    const updateBlocks = () => {
      const chain = blockchain.chain;
      setBlocks([...chain]);
      highlightNewBlock(chain[chain.length - 1].hash);
    };

    const interval = setInterval(updateBlocks, 3000);
    return () => clearInterval(interval);
  }, [blockchain]);

  const highlightNewBlock = (blockHash: string) => {
    setNewBlockHighlight(blockHash);
    setTimeout(() => setNewBlockHighlight(null), 1000);
  };

  return (
    <div className="relative md:min-h-[400px] w-full overflow-hidden p-8">
      {/* Vertical connection line */}
      <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-emerald-400/20 to-blue-400/20" />

      <div className="relative grid gap-12">
        <AnimatePresence>
          {blocks.map((block, idx) => (
            <motion.div
              key={block.hash}
              variants={blockVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
              className={`relative z-10 mx-auto p-6 w-full max-w-md rounded-xl border ${
                newBlockHighlight === block.hash
                  ? 'border-emerald-400/50 bg-emerald-400/10'
                  : 'border-gray-700 bg-gray-800'
              } transition-all duration-300 shadow-lg`}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400">#{idx}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(block.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <span className="text-xs px-2 py-1 bg-gray-700 rounded-full">
                  {block.transactions.length} TXs
                </span>
              </div>

              {/* Body */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Previous Hash:</span>
                  <span className="font-mono text-gray-300 truncate max-w-[120px]">
                    {block.previousHash || 'Genesis'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Hash:</span>
                  <span className="font-mono text-emerald-400 truncate max-w-[120px]">
                    {block.hash}
                  </span>
                </div>
              </div>

              {/* New badge */}
              {idx === blocks.length - 1 && (
                <div className="absolute -top-3 -right-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-2 py-1 text-xs bg-emerald-400/10 text-emerald-400 rounded-full border border-emerald-400/20"
                  >
                    Newest
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-emerald-400/30 rounded-full"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0
            }}
            animate={{
              x: [`0%`, `${Math.random() * 100}%`],
              y: [`0%`, `${Math.random() * 100}%`],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlockchainVisualization;
