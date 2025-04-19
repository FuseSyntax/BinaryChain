'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const faqs = [
  {
    question: 'What’s the difference between symmetric and asymmetric encryption?',
    answer: 'Symmetric encryption uses one key to lock and unlock data, like a single house key. Asymmetric encryption uses two keys—a public key to lock and a private key to unlock, like a mailbox where anyone can drop mail, but only you can open it.',
  },
  {
    question: 'Why are hash functions irreversible?',
    answer: 'Hash functions are designed to be one-way, like shredding a document—you can’t piece it back together. They use complex math to create a unique output, and even a tiny change in input produces a completely different hash.',
  },
  {
    question: 'How do digital signatures prevent fraud?',
    answer: 'Digital signatures use your private key to sign data, proving it’s from you. Others verify it with your public key. If someone alters the data, the signature won’t match, exposing the fraud.',
  },
];

const quizQuestions = [
  {
    question: 'What does encryption do?',
    options: [
      'Scrambles data to keep it secret',
      'Creates a digital signature',
      'Generates a unique hash',
      'Stores data on the blockchain',
    ],
    correct: 0,
  },
  {
    question: 'What is a hash function used for?',
    options: [
      'Encrypting data',
      'Verifying data integrity',
      'Signing transactions',
      'Mining blocks',
    ],
    correct: 1,
  },
  {
    question: 'What verifies a digital signature?',
    options: [
      'Private key',
      'Public key',
      'Hash function',
      'Blockchain',
    ],
    correct: 1,
  },
];

const CryptographicSecurity = () => {
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
      return "Perfect score! You're a cryptographic security expert!";
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
          Cryptographic Security
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16"
        >
          Learn how cryptographic security keeps your blockchain transactions safe, using simple tools like locks, fingerprints, and signatures.
        </motion.p>

        {/* Introduction */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">What is Cryptographic Security?</h2>
          <p className="text-gray-300 leading-relaxed">
            Imagine sending a secret message in a locked box. Cryptographic security is like that lock—it protects your data so only the right person can open it. In blockchain, it ensures your transactions (like sending digital money) are safe, private, and authentic.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            It uses three main tools: <strong>Encryption</strong> (hiding data), <strong>Hashing</strong> (fingerprinting data), and <strong>Digital Signatures</strong> (proving it’s you). Let’s break them down!
          </p>
        </motion.section>

        {/* Key Concepts */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Key Concepts</h2>

          {/* Encryption */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/lock.svg" alt="Encryption Lock" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Encryption</h3>
            </motion.div>
            <p className="text-gray-300">
              Encryption scrambles your data so only someone with the right key can read it. Think of it like locking a diary—only the keyholder can open it.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: When you send a transaction on BinaryChain, encryption hides the details from hackers.</p>
            </motion.div>
          </div>

          {/* Hashing */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/hash.svg" alt="Hash Function" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Hashing</h3>
            </motion.div>
            <p className="text-gray-300">
              Hashing creates a unique “fingerprint” for data, like a barcode for a book. Even a tiny change in the data makes a completely different fingerprint.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: BinaryChain uses hashing to ensure no one tampers with transaction records.</p>
            </motion.div>
          </div>

          {/* Digital Signatures */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/signature.svg" alt="Digital Signature" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Digital Signatures</h3>
            </motion.div>
            <p className="text-gray-300">
              A digital signature proves you sent a transaction, like signing a check. It uses a private key to sign and a public key to verify, ensuring authenticity.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: In BinaryChain, your wallet signs transactions to prove they’re from you.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works in Blockchain */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">How It Works in Blockchain</h2>
          <p className="text-gray-300 leading-relaxed">
            In BinaryChain, cryptographic security protects every step:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <strong>Encryption</strong>: Hides transaction details so only the recipient can read them.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <strong>Hashing</strong>: Links blocks together, making the chain tamper-proof.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <strong>Digital Signatures</strong>: Verifies that you authorized a transaction, preventing fraud.
            </motion.li>
          </ul>
          <motion.div
            className="mt-8 p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-emerald-400/20 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-300">
              Try it yourself! Visit the <Link href="/mine" className="text-emerald-400 hover:text-emerald-300">Mining Page</Link> to see cryptography in action.
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
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:bg-em eral-600"
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
            You’ve learned the basics of cryptographic security! Explore more blockchain concepts or dive into BinaryChain’s features to see cryptography in action.
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

export default CryptographicSecurity;