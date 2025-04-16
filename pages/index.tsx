import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRightIcon, BeakerIcon, CpuChipIcon, CodeBracketIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import BlockchainVisualization from '../components/BlockchainVisualization';
import { useEffect, useState } from 'react';
import { Blockchain } from '../lib/blockchain';


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);

  useEffect(() => {
    // Initialize blockchain
    const chain = new Blockchain();
    
    // Add some sample transactions periodically
    const interval = setInterval(() => {
      chain.addTransaction({
        fromAddress: 'Alice',
        toAddress: 'Bob',
        amount: Math.random() * 10
      });
    }, 5000);

    setBlockchain(chain);
    return () => clearInterval(interval);
  }, []);

  if (!blockchain) return null;
  return (
    <>
      {/* Hero Section with Animated Gradient */}
      <section className="relative text-center py-32 bg-gradient-to-br from-emerald-900 via-gray-900 to-emerald-900 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto px-4"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
              Blockchain Explorer
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Visualize blockchain technology through interactive experiments and real-time demonstrations.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex gap-4 justify-center">
            <Link 
              href="/mine" 
              className="group relative bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl flex items-center transition-all duration-300 shadow-lg hover:shadow-emerald-500/20"
            >
              <span className="relative z-10">Start Mining</span>
              <div className="ml-2 w-5 h-5 relative overflow-hidden">
                <ChevronRightIcon className="h-5 w-5 absolute transition-all group-hover:translate-x-full" />
                <ChevronRightIcon className="h-5 w-5 -translate-x-full absolute transition-all group-hover:translate-x-0" />
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,transparent,rgba(0,0,0,0.8))]" />
        </div>
      </section>

      {/* What We're Doing Section with Floating Animation */}
      <section className="relative py-24 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 rounded-3xl border border-gray-700 shadow-2xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-emerald-500/10 rounded-xl">
                <BeakerIcon className="h-12 w-12 text-emerald-400" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                What We're Building
              </h2>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-gray-300 text-xl leading-relaxed">
              A functional blockchain implementation that brings to life core concepts through interactive visualization. 
              Witness real-time transactions, mining operations, and network consensus in action.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section with Timeline */}
      <section className="py-24 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
              How It Works
            </span>
          </motion.h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-emerald-400 to-blue-400 transform -translate-x-1/2" />
            
            <div className="grid gap-16">
              {[
                { 
                  title: 'Transaction Creation', 
                  desc: 'Digitally signed operations initiated by users',
                  icon: <CodeBracketIcon className="h-8 w-8 text-white" />
                },
                { 
                  title: 'Block Mining', 
                  desc: 'Proof-of-work consensus mechanism validation',
                  icon: <CpuChipIcon className="h-8 w-8 text-white" />
                },
                { 
                  title: 'Chain Validation', 
                  desc: 'Network-wide consensus and integrity checks',
                  icon: <ShieldCheckIcon className="h-8 w-8 text-white" />
                },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="relative z-10 grid grid-cols-2 gap-8 items-center"
                  style={{ direction: idx % 2 === 0 ? 'ltr' : 'rtl' }}
                >
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${idx % 2 === 0 ? 'from-emerald-600 to-blue-600 ml-auto' : 'from-blue-600 to-emerald-600 mr-auto'} shadow-xl`}>
                    <div className="w-16 h-16 rounded-xl bg-black/20 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mt-4">{item.title}</h3>
                    <p className="text-gray-200 mt-2">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Concept Visualization */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-8">
              Live Chain Visualization
            </h2>
            
            <BlockchainVisualization blockchain={blockchain} />
          </div>
        </div>
      </section>

      {/* Animated Features Grid */}
      <section className="py-24 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Core Features
          </h2>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            variants={stagger}
          >
            {['Cryptographic Security', 'Distributed Ledger', 'Consensus Algorithm', 
              'Immutable Records', 'Smart Contracts', 'Peer-to-Peer Network'].map((feature, idx) => (
              <motion.div 
                key={feature}
                variants={fadeInUp}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-850 border border-gray-700 hover:border-emerald-400 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 mask mask-hexagon-2" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature}</h3>
                <p className="text-gray-400 mt-2">Explore implementation details and visual breakdown</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}