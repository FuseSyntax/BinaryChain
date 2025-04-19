'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  ChevronRightIcon,
  BeakerIcon,
  CpuChipIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import BlockchainVisualization from '../components/BlockchainVisualization';
import { Wallet } from '../lib/wallet';
import { Transaction } from '../lib/transaction';
import { getBlockchainInstance } from '../lib/blockchainInstance';
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
  const [chain, setChain] = useState<Blockchain | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.7]);

  useEffect(() => {
    // Initialize blockchain instance
    const initBlockchain = async () => {
      try {
        const blockchain = await getBlockchainInstance();
        setChain(blockchain);
        setError(null);
      } catch (error) {
        console.error('Error initializing blockchain:', error);
        setError('Failed to load blockchain. Please try again later.');
      }
    };
    initBlockchain();

    // Simulate transaction creation
    const senderWallet = new Wallet();
    const interval = setInterval(async () => {
      try {
        const blockchain = await getBlockchainInstance();
        const amount = parseFloat((0.01 + Math.random() * 9.99).toFixed(2));
        const tx = new Transaction(senderWallet.publicKey, 'Bob', amount);
        senderWallet.signTransaction(tx);
        blockchain.addTransaction(tx);
        setChain(blockchain);
      } catch (error) {
        console.error('Transaction failed:', error instanceof Error ? error.message : error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { title: 'Cryptographic Security', href: '/cryptographic' },
    { title: 'Distributed Ledger', href: '/distributed-ledger' },
    { title: 'Consensus Algorithm', href: '/consensus-algorithm' },
    { title: 'Immutable Records', href: '/immutable-records' },
    { title: 'Smart Contracts', href: '/smart-contracts' },
    { title: 'Peer-to-Peer Network', href: '/p2p-network' },
  ];

  if (!chain) {
    return (
      <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
        {error ? <p className="text-red-400">{error}</p> : 'Loading blockchain...'}
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-white">
      {/* Hero Section */}
      <motion.section
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900 via-gray-950 to-blue-900 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:radial-gradient(circle,black_10%,transparent_90%)]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-[url('/circuit.svg')] opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-6xl md:text-8xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500"
          >
            BinaryChain
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 mt-6 max-w-3xl mx-auto"
          >
            Experience the future of blockchain with real-time visualizations, advanced cryptography, and decentralized innovation.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-10 flex gap-6 justify-center">
            <Link
              href="/mine"
              className="relative md:px-8 px-4 md:py-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Mining
                <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/concepts"
              className="md:px-8 px-4 md:py-4 py-2 bg-transparent border-2 border-emerald-400 text-emerald-400 rounded-xl hover:bg-emerald-400 hover:text-white transition-all duration-300"
            >
              Explore Concepts
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-950 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.section>

      {/* What We’re Building */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gray-800/30 backdrop-blur-lg p-8 rounded-3xl border border-emerald-400/20 shadow-2xl hover:shadow-emerald-400/30 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-50" />
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-4 bg-emerald-500/20 rounded-xl">
                <BeakerIcon className="h-12 w-12 text-emerald-400" />
              </div>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                Pioneering Blockchain Innovation
              </h2>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-gray-300 text-xl leading-relaxed relative z-10">
              BinaryChain is a cutting-edge platform that brings blockchain concepts to life through interactive, real-time demonstrations and advanced visualizations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* How It Works - 3D Carousel */}
      <section className="py-24 px-4 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400"
          >
            How BinaryChain Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Transaction Creation', desc: 'Users initiate secure, digitally signed transactions.', icon: <CodeBracketIcon className="h-8 w-8 text-white" /> },
              { title: 'Block Mining', desc: 'Proof-of-Work validates and secures the blockchain.', icon: <CpuChipIcon className="h-8 w-8 text-white" /> },
              { title: 'Chain Validation', desc: 'Decentralized consensus ensures network integrity.', icon: <ShieldCheckIcon className="h-8 w-8 text-white" /> },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-6 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-emerald-400/20 hover:border-emerald-400 transition-all"
              >
                <motion.div whileHover={{ rotateY: 10, scale: 1.05 }} className="w-16 h-16 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                  {item.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mt-4">{item.title}</h3>
                <p className="text-gray-300 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Visualization Dashboard */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
            Real-Time Blockchain Dashboard
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-emerald-400/20 shadow-lg">
            <BlockchainVisualization blockchain={chain} />
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <p className="text-gray-400">Blocks</p>
                <p className="text-2xl font-bold text-emerald-400">{chain.chain.length}</p>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <p className="text-gray-400">Pending Tx</p>
                <p className="text-2xl font-bold text-emerald-400">{chain.pendingTransactions.length}</p>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <p className="text-gray-400">Difficulty</p>
                <p className="text-2xl font-bold text-emerald-400">{chain.difficulty}</p>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <p className="text-gray-400">Peers</p>
                <p className="text-2xl font-bold text-emerald-400">{chain.peers.size}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-24 px-4 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-gray-950 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">Core Blockchain Features</motion.h2>
          <motion.div className="grid md:grid-cols-3 gap-8" initial="initial" whileInView="animate" variants={stagger}>
            {features.map((feat) => (
              <motion.div key={feat.title} variants={fadeInUp} whileHover={{ scale: 1.05, rotateY: 10 }} className="relative p-6 bg-gray-800/40 backdrop-blur-md rounded-xl border border-emerald-400/20 hover:border-emerald-400 transition-all group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <motion.div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4" animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">{feat.title}</h3>
                  <p className="text-gray-400 mt-2">Discover advanced implementations and interactive visualizations.</p>
                  <Link href={feat.href} className="mt-4 inline-block text-emerald-400 hover:text-emerald-300">Learn More</Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}