'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const faqs = [
  {
    question: 'Why can’t blockchain records be changed?',
    answer: 'Once a block is added, it’s linked to the previous block with a hash. Changing a record would require changing all subsequent blocks, which is nearly impossible due to consensus and cryptography.',
  },
  {
    question: 'What happens if someone tries to alter a block?',
    answer: 'The altered block’s hash would no longer match, and other nodes would reject it, maintaining the blockchain’s integrity.',
  },
  {
    question: 'Are all blockchains immutable?',
    answer: 'Public blockchains like BinaryChain are immutable. Some private blockchains may allow changes under specific rules, but this is rare.',
  },
];

const quizQuestions = [
  {
    question: 'What makes blockchain records immutable?',
    options: [
      'Centralized control',
      'Cryptographic hashing and consensus',
      'Editable transactions',
      'Single node validation',
    ],
    correct: 1,
  },
  {
    question: 'What protects a block from being altered?',
    options: [
      'Digital signatures',
      'Hash links to previous blocks',
      'Encryption keys',
      'Manual audits',
    ],
    correct: 1,
  },
  {
    question: 'What happens if a block is tampered with?',
    options: [
      'The network accepts it',
      'The hash becomes invalid',
      'The blockchain forks',
      'Nothing happens',
    ],
    correct: 1,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const ImmutableRecords = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>(Array(quizQuestions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleQuizAnswer = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...quizAnswers];
    if (newAnswers[questionIndex] === optionIndex) {
      newAnswers[questionIndex] = -1; // Deselect if already selected
    } else {
      newAnswers[questionIndex] = optionIndex;
    }
    setQuizAnswers(newAnswers);
  };

  const submitQuiz = () => {
    let correctCount = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const getFeedbackMessage = () => {
    if (score === quizQuestions.length) {
      return "Perfect score! You're an immutability expert!";
    } else if (score >= quizQuestions.length / 2) {
      return "Great job! You've got a solid understanding!";
    } else {
      return "Not bad! Keep learning and you'll get there!";
    }
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
          Immutable Records
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16"
        >
          Understand why blockchain records are permanent, ensuring trust and reliability in BinaryChain.
        </motion.p>

        {/* Introduction */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">What are Immutable Records?</h2>
          <p className="text-gray-300 leading-relaxed">
            Imagine writing in a notebook with permanent ink—you can’t erase or change it. Immutable records in a blockchain are like that: once a transaction is recorded, it’s locked forever.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            This permanence builds trust, as no one can rewrite history to cheat the system.
          </p>
        </motion.section>

        {/* Key Aspects */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Key Aspects</h2>

          {/* Hash Linking */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/immutable.svg" alt="Immutable Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Hash Linking</h3>
            </motion.div>
            <p className="text-gray-300">
              Each block contains a hash of the previous block, creating a chain. Changing one block breaks the chain, alerting the network.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: BinaryChain’s blocks are linked by hashes, ensuring immutability.</p>
            </motion.div>
          </div>

          {/* Consensus Protection */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/immutable.svg" alt="Immutable Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Consensus Protection</h3>
            </motion.div>
            <p className="text-gray-300">
              Nodes agree on the blockchain’s state. A tampered block would be rejected by the majority, preserving immutability.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: BinaryChain’s consensus ensures no single node can alter records.</p>
            </motion.div>
          </div>

          {/* Cryptographic Security */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/immutable.svg" alt="Immutable Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Cryptographic Security</h3>
            </motion.div>
            <p className="text-gray-300">
              Hashes and digital signatures lock records, making unauthorized changes detectable.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: BinaryChain uses cryptography to protect its ledger.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works in Blockchain */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">How It Works in Blockchain</h2>
          <p className="text-gray-300 leading-relaxed">
            In BinaryChain, immutable records ensure reliability:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <strong>Permanent History</strong>: Transactions can’t be erased or altered.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <strong>Trust</strong>: Users rely on the unchangeable ledger for accuracy.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <strong>Security</strong>: Cryptography and consensus protect against tampering.
            </motion.li>
          </ul>
          <motion.div
            className="mt-8 p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-emerald-400/20 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-300">
              Try it yourself! Visit the <Link href="/transactions" className="text-emerald-400 hover:text-emerald-300">Transactions Page</Link> to see immutable records.
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

        {/* Quiz */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Test Your Knowledge</h2>
          <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20">
            {quizQuestions.map((q, qIndex) => (
              <div key={qIndex} className="mb-6">
                <p className="text-xl font-semibold text-white mb-4">{q.question}</p>
                <div className="grid gap-2">
                  {q.options.map((option, oIndex) => (
                    <button
                      key={oIndex}
                      className={`p-4 rounded-lg text-left transition-colors cursor-pointer
                        ${quizAnswers[qIndex] === oIndex
                          ? 'bg-emerald-500/20 border-emerald-400'
                          : 'bg-gray-700/50 border-emerald-400/30 hover:bg-emerald-500/20'
                        }
                        ${showResults
                          ? oIndex === q.correct
                            ? 'bg-emerald-500/20 border-emerald-400'
                            : 'bg-red-500/20 border-red-400'
                          : ''
                        }`}
                      onClick={() => handleQuizAnswer(qIndex, oIndex)}
                      disabled={showResults}
                    >
                      <motion.div whileHover={{ scale: showResults ? 1 : 1.02 }}>
                        {option}
                      </motion.div>
                    </button>
                  ))}
                </div>
                {showResults && (
                  <p className={`mt-2 ${quizAnswers[qIndex] === q.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                    {quizAnswers[qIndex] === q.correct ? 'Correct!' : `Incorrect. Correct answer: ${q.options[q.correct]}`}
                  </p>
                )}
              </div>
            ))}
            {!showResults && (
              <motion.button
                className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:bg-emerald-600"
                onClick={submitQuiz}
                whileHover={{ scale: 1.05 }}
                disabled={quizAnswers.some((answer) => answer === -1)}
              >
                {quizAnswers.some((answer) => answer === -1) ? 'Answer All Questions' : 'Submit Answers'}
              </motion.button>
            )}
            {showResults && (
              <div className="mt-6 text-center">
                <motion.div className="mb-4 p-4 bg-gray-800/50 backdrop-blur-md rounded-xl border border-emerald-400/20">
                  <h3 className="text-2xl font-bold text-white mb-2">Your Score: {score}/{quizQuestions.length}</h3>
                  <p className="text-lg text-emerald-400">{getFeedbackMessage()}</p>
                </motion.div>
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
            You’ve learned about immutable records! Explore more blockchain concepts or dive into BinaryChain’s features to see them in action.
          </p>
          <motion.div
            className="mt-8 flex gap-6 justify-center"
            variants={fadeInUp}
          >
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
};

export default ImmutableRecords;