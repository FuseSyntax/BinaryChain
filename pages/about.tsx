'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const faqs = [
  {
    question: 'What is BinaryChain’s goal?',
    answer: 'BinaryChain aims to make blockchain technology accessible by providing an educational platform where users can learn and experiment with decentralized systems.',
  },
  {
    question: 'Who can use BinaryChain?',
    answer: 'Anyone interested in blockchain, from beginners to developers, can use BinaryChain to explore concepts, mine blocks, or view transactions.',
  },
  {
    question: 'How does BinaryChain ensure security?',
    answer: 'BinaryChain uses cryptographic security, consensus algorithms, and a P2P network to protect its blockchain, as explained in our Concepts pages.',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const About = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.h1
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 mb-12"
        >
          About BinaryChain
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16"
        >
          Learn about BinaryChain, our mission to democratize blockchain education, and how we’re building a decentralized future.
        </motion.p>

        {/* Introduction */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            BinaryChain is a platform designed to make blockchain technology understandable and accessible. We believe everyone should have the chance to explore decentralized systems, whether you’re a curious beginner or a seasoned developer.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Through interactive tools, educational content, and hands-on features like mining and transactions, we’re empowering users to dive into the world of blockchain.
          </p>
        </motion.section>

        {/* Key Features */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">What We Offer</h2>

          {/* Education */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/circuit.svg" alt="Circuit Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </motion.div>
            <p className="text-gray-300">
              Learn blockchain concepts like cryptography, consensus, and smart contracts through simple explanations and quizzes.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Explore our <Link href="/concepts" className="text-emerald-400 hover:text-emerald-300">Concepts</Link> pages.</p>
            </motion.div>
          </div>

          {/* Interactivity */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/circuit.svg" alt="Circuit Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Interactivity</h3>
            </motion.div>
            <p className="text-gray-300">
              Mine blocks, view transactions, and connect with peers to experience blockchain in action.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Try it on the <Link href="/mine" className="text-emerald-400 hover:text-emerald-300">Mining Page</Link>.</p>
            </motion.div>
          </div>

          {/* Community */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/circuit.svg" alt="Circuit Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Community</h3>
            </motion.div>
            <p className="text-gray-300">
              Join our community on GitHub, Twitter, and Discord to collaborate, ask questions, and share ideas.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Connect via <Link href="https://github.com" className="text-emerald-400 hover:text-emerald-300">GitHub</Link>.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Vision */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            We envision a world where decentralized technologies empower individuals, foster trust, and drive innovation. BinaryChain is a step toward that future, providing tools and knowledge to build on blockchain.
          </p>
          <motion.div
            className="mt-8 p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-emerald-400/20 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-300">
              Join us! Start exploring on the <Link href="/concepts" className="text-emerald-400 hover:text-emerald-300">Concepts Page</Link>.
            </p>
          </motion.div>
        </motion.section>

        {/* FAQs */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-emerald-400/20 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <button
                className="flex justify-between items-center w-full text-left text-xl font-semibold text-white"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                {openFaq === index ? (
                  <ChevronUpIcon className="w-6 h-6 text-emerald-400" />
                ) : (
                  <ChevronDownIcon className="w-6 h-6 text-emerald-400" />
                )}
              </button>
              {openFaq === index && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="text-gray-300 mt-2"
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </motion.section>

        {/* Conclusion */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Get Started</h2>
          <p className="text-gray-300 leading-relaxed">
            Ready to dive into blockchain? Explore our educational content, try mining, or join our community to learn more about BinaryChain.
          </p>
          <motion.div
            className="mt-8 flex gap-6 justify-center"
            variants={fadeInUp}
          >
            <Link
              href="/concepts"
              className="md:px-8 px-4 md:py-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all"
            >
              Explore Concepts
            </Link>
            <Link
              href="/mine"
              className="md:px-8 px-4 md:py-4 py-2 bg-transparent border-2 border-emerald-400 text-emerald-400 rounded-xl hover:bg-emerald-400 hover:text-white transition-all"
            >
              Start Mining
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;