'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const faqs = [
  {
    question: 'What data does BinaryChain collect?',
    answer: 'BinaryChain collects minimal data, such as wallet addresses for transactions and anonymized usage metrics to improve the platform. We don’t collect personal identifiable information.',
  },
  {
    question: 'How is my data protected?',
    answer: 'We use cryptographic security (e.g., hashing, digital signatures) and store data on a decentralized blockchain, ensuring it’s tamper-proof and secure.',
  },
  {
    question: 'Do you share my data with third parties?',
    answer: 'No, BinaryChain does not share your data with third parties. All data remains on the blockchain, accessible only as per the platform’s public nature.',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Privacy = () => {
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
          Privacy Policy
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16"
        >
          Understand how BinaryChain protects your data and ensures privacy in our decentralized platform.
        </motion.p>

        {/* Introduction */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Our Commitment to Privacy</h2>
          <p className="text-gray-300 leading-relaxed">
            At BinaryChain, we prioritize your privacy. Our decentralized platform is designed to minimize data collection and maximize security, leveraging blockchain technology to keep your information safe.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            This policy outlines what data we collect, how we protect it, and your rights as a user.
          </p>
        </motion.section>

        {/* Key Practices */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Our Privacy Practices</h2>

          {/* Minimal Data Collection */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/lock.svg" alt="Lock Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Minimal Data Collection</h3>
            </motion.div>
            <p className="text-gray-300">
              We only collect essential data, like wallet addresses for transactions and anonymized metrics to improve performance.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: Your transaction data is stored on the blockchain, not in a central database.</p>
            </motion.div>
          </div>

          {/* Decentralized Storage */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/lock.svg" alt="Lock Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Decentralized Storage</h3>
            </motion.div>
            <p className="text-gray-300">
              Data is stored on the blockchain, distributed across nodes, ensuring no single point of failure or control.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Learn more on the <Link href="/concepts/distributed-ledger" className="text-emerald-400 hover:text-emerald-300">Distributed Ledger</Link> page.</p>
            </motion.div>
          </div>

          {/* Cryptographic Security */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/lock.svg" alt="Lock Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Cryptographic Security</h3>
            </motion.div>
            <p className="text-gray-300">
              We use hashing, digital signatures, and encryption to protect your data, ensuring it’s secure and tamper-proof.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Explore how on the <Link href="/concepts/cryptographic" className="text-emerald-400 hover:text-emerald-300">Cryptographic Security</Link> page.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Your Rights */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Your Rights</h2>
          <p className="text-gray-300 leading-relaxed">
            As a BinaryChain user, you have control over your data:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <strong>Transparency</strong>: View all blockchain data, as it’s publicly accessible.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <strong>Anonymity</strong>: Use wallet addresses without linking to personal information.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <strong>Contact Us</strong>: Reach out via <Link href="/contact" className="text-emerald-400 hover:text-emerald-300">Contact</Link> for privacy concerns.
            </motion.li>
          </ul>
          <motion.div
            className="mt-8 p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-emerald-400/20 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-300">
              Learn more about blockchain privacy on the <Link href="/concepts/cryptographic" className="text-emerald-400 hover:text-emerald-300">Cryptographic Security</Link> page.
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
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">
            Have questions about our privacy practices? Reach out via our <Link href="/contact" className="text-emerald-400 hover:text-emerald-300">Contact</Link> page or explore our blockchain features.
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
              href="/contact"
              className="md:px-8 px-4 md:py-4 py-2 bg-transparent border-2 border-emerald-400 text-emerald-400 rounded-xl hover:bg-emerald-400 hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Privacy;