// pages/404.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CpuChipIcon, FingerPrintIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
      
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-emerald-400/30 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0
          }}
          animate={{
            x: ['0%', Math.random() * 100 + '%'],
            y: ['0%', Math.random() * 100 + '%'],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <div className="mb-8 inline-block p-6 rounded-2xl bg-gradient-to-br from-emerald-400/10 to-blue-400/10 border border-emerald-400/20">
          <div className="flex items-center gap-3 text-emerald-400">
            <FingerPrintIcon className="w-12 h-12" />
            <CpuChipIcon className="w-12 h-12" />
          </div>
        </div>

        <h1 className="text-9xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">
          Block Not Found in Chain
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          The requested block hash does not exist in our blockchain. 
          It may have been orphaned or never mined. Verify the hash or 
          return to the main chain.
        </p>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all duration-300 group"
          >
            <span>Return to Genesis Block</span>
            <div className="w-5 h-5 relative overflow-hidden">
              <CpuChipIcon className="w-5 h-5 absolute transition-all group-hover:translate-y-full" />
              <CpuChipIcon className="w-5 h-5 -translate-y-full absolute transition-all group-hover:translate-y-0" />
            </div>
          </Link>
        </motion.div>

        {/* Blockchain Hash Pattern */}
        <div className="mt-12 font-mono text-xs text-gray-500">
          ERROR_CODE: 0x404a1b{" "}
          <span className="mx-2">|</span> 
          CHAIN_ID: 0x1{" "}
          <span className="mx-2">|</span>
          STATUS: BLOCK_NOT_FOUND
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;