'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const faqs = [
  {
    question: 'What makes a smart contract “smart”?',
    answer:
      'A smart contract is “smart” because it automatically executes predefined actions when conditions are met, without human intervention, like a vending machine dispensing a snack after payment.',
  },
  {
    question: 'Can smart contracts be changed once deployed?',
    answer:
      'Most smart contracts are immutable once deployed on the blockchain, ensuring trust. Some include upgrade mechanisms, but this requires careful design.',
  },
  {
    question: 'How are smart contracts secure?',
    answer:
      'They run on a blockchain with cryptographic security and consensus, ensuring tamper-proof execution. However, bugs in the code can create vulnerabilities.',
  },
];

const quizQuestions = [
  {
    question: 'What is a smart contract?',
    options: [
      'A centralized server program',
      'A self-executing blockchain program',
      'A manual contract',
      'A cryptographic key',
    ],
    correct: 1,
  },
  {
    question: 'What triggers a smart contract?',
    options: [
      'Manual approval',
      'Predefined conditions',
      'Random events',
      'Central authority',
    ],
    correct: 1,
  },
  {
    question: 'What’s a benefit of smart contracts?',
    options: [
      'Requires intermediaries',
      'Slow execution',
      'Trustless automation',
      'Editable after deployment',
    ],
    correct: 2,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function SmartContracts() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>(Array(quizQuestions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleQuizAnswer = (qIdx: number, oIdx: number) => {
    setQuizAnswers((prev) => {
      const updated = [...prev];
      // Deselect if same option clicked again
      updated[qIdx] = updated[qIdx] === oIdx ? -1 : oIdx;
      return updated;
    });
  };

  const submitQuiz = () => {
    let correctCount = 0;
    quizAnswers.forEach((ans, idx) => {
      if (ans === quizQuestions[idx].correct) correctCount++;
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const getFeedbackMessage = () => {
    if (score === quizQuestions.length) return "Perfect score! You're a Smart Contract guru!";
    if (score >= quizQuestions.length / 2) return "Great job! You understand smart contracts well!";
    return "Not bad! Review the concepts and try again!";
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
          Smart Contracts
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16"
        >
          Discover how smart contracts automate agreements on the blockchain, powering trustless transactions in BinaryChain.
        </motion.p>

        {/* Introduction */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">What is a Smart Contract?</h2>
          <p className="text-gray-300 leading-relaxed">
            Imagine a vending machine: you insert money, pick a snack, and it delivers automatically. A smart contract is like that—a program on the blockchain that runs automatically when conditions are met.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            It eliminates intermediaries, ensuring fair and transparent agreements.
          </p>
        </motion.section>

        {/* Key Aspects */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Key Aspects</h2>

          {/* Automation */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 mb-4">
              <Image width={100} height={100} src="/contract.svg" alt="Contract Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Automation</h3>
            </motion.div>
            <p className="text-gray-300">
              Smart contracts execute actions (e.g., transferring funds) when predefined conditions are met, without manual intervention.
            </p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 p-4 bg-gray-700/20 rounded-lg">
              <p className="text-gray-400 italic">Example: BinaryChain’s smart contracts automate payments on the Transactions page.</p>
            </motion.div>
          </div>

          {/* Trustlessness */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 mb-4">
              <Image width={100} height={100} src="/contract.svg" alt="Contract Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Trustlessness</h3>
            </motion.div>
            <p className="text-gray-300">
              Parties don’t need to trust each other—the blockchain enforces the contract’s rules transparently.
            </p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 p-4 bg-gray-700/20 rounded-lg">
              <p className="text-gray-400 italic">Example: BinaryChain’s contracts ensure fair deals without middlemen.</p>
            </motion.div>
          </div>

          {/* Immutability */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 mb-4">
              <Image width={100} height={100} src="/contract.svg" alt="Contract Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Immutability</h3>
            </motion.div>
            <p className="text-gray-300">
              Once deployed, smart contracts can’t be altered, ensuring reliability and trust.
            </p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 p-4 bg-gray-700/20 rounded-lg">
              <p className="text-gray-400 italic">Example: BinaryChain’s contracts are locked on the blockchain.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works in Blockchain */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">How It Works in Blockchain</h2>
          <p className="text-gray-300 leading-relaxed">
            In BinaryChain, smart contracts streamline processes:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <motion.li initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <strong>Automation</strong>: Executes transactions when conditions are met.
            </motion.li>
            <motion.li initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <strong>Transparency</strong>: Code is visible, ensuring fair execution.
            </motion.li>
            <motion.li initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
              <strong>Security</strong>: Blockchain’s cryptography protects contracts.
            </motion.li>
          </ul>
          <motion.div whileHover={{ scale: 1.02 }} className="mt-8 p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-emerald-400/20 text-center">
            <p className="text-gray-300">
              Try it yourself! Visit the <Link href="/transactions" className="text-emerald-400 hover:text-emerald-300">Transactions Page</Link> to see smart contracts.
            </p>
          </motion.div>
        </motion.section>

        {/* FAQs */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-emerald-400/20 mb-4"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="flex justify-between items-center w-full text-left text-xl font-semibold text-white"
              >
                {faq.question}
                {openFaq === idx ? (
                  <ChevronUpIcon className="w-6 h-6 text-emerald-400" />
                ) : (
                  <ChevronDownIcon className="w-6 h-6 text-emerald-400" />
                )}
              </button>
              {openFaq === idx && (
                <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-gray-300 mt-2">
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </motion.section>

        {/* Quiz */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Test Your Knowledge</h2>
          <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20">
            {quizQuestions.map((q, qi) => (
              <div key={qi} className="mb-6">
                <p className="text-xl font-semibold text-white mb-4">{q.question}</p>
                <div className="grid gap-2">
                  {q.options.map((opt, oi) => {
                    const selected = quizAnswers[qi] === oi;
                    const isCorrect = showResults && oi === q.correct;
                    const isWrong = showResults && selected && oi !== q.correct;

                    let bgClass = 'bg-gray-700/50 border-emerald-400/30 hover:bg-emerald-500/20';
                    if (selected) bgClass = 'bg-emerald-500/20 border-emerald-400';
                    if (isCorrect) bgClass = 'bg-emerald-500/20 border-emerald-400';
                    if (isWrong) bgClass = 'bg-red-500/20 border-red-400';

                    return (
                      <button
                        key={oi}
                        className={`p-4 rounded-lg text-left border transition-colors ${bgClass}`}
                        onClick={() => handleQuizAnswer(qi, oi)}
                        disabled={showResults}
                        style={{ cursor: showResults ? 'not-allowed' : 'pointer' }}
                      >
                        <motion.div whileHover={{ scale: showResults ? 1 : 1.02 }}>{opt}</motion.div>
                      </button>
                    );
                  })}
                </div>
                {showResults && (
                  <p className={`mt-2 ${quizAnswers[qi] === q.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                    {quizAnswers[qi] === q.correct
                      ? 'Correct!'
                      : `Incorrect. Correct answer: ${q.options[q.correct]}`}
                  </p>
                )}
              </div>
            ))}

            {!showResults ? (
              <motion.button
                className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:bg-emerald-600"
                onClick={submitQuiz}
                whileHover={{ scale: 1.05 }}
                disabled={quizAnswers.some((ans) => ans === -1)}
                style={{ cursor: quizAnswers.some((ans) => ans === -1) ? 'not-allowed' : 'pointer' }}
              >
                {quizAnswers.some((ans) => ans === -1) ? 'Answer All Questions' : 'Submit Answers'}
              </motion.button>
            ) : (
              <div className="mt-6 text-center">
                <div className="mb-4 p-4 bg-gray-800/50 backdrop-blur-md rounded-xl border border-emerald-400/20">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Your Score: {score}/{quizQuestions.length}
                  </h3>
                  <p className="text-lg text-emerald-400">{getFeedbackMessage()}</p>
                </div>
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:bg-emerald-600"
                  onClick={() => {
                    setQuizAnswers(Array(quizQuestions.length).fill(-1));
                    setShowResults(false);
                    setScore(0);
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  Try Again
                </motion.button>
              </div>
            )}
          </div>
        </motion.section>

        {/* Conclusion */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">What’s Next?</h2>
          <p className="text-gray-300 leading-relaxed">
            You’ve learned about smart contracts! Explore more blockchain concepts or dive into BinaryChain’s features to see them in action.
          </p>
          <motion.div variants={fadeInUp} className="mt-8 flex gap-6 justify-center">
            <Link
              href="/concepts"
              className="md:px-8 px-4 md:py-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all"
            >
              More Concepts
            </Link>
            <Link
              href="/transactions"
              className="md:px-8 px-4 md:py-4 py-2 bg-transparent border-2 border-emerald-400 text-emerald-400 rounded-xl hover:bg-emerald-400 hover:text-white transition-all"
            >
              View Transactions
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
