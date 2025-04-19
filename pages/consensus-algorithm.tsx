'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const faqs = [
  {
    question: 'What is Proof-of-Work?',
    answer: 'Proof-of-Work (PoW) is a consensus algorithm where miners solve complex math puzzles to validate transactions and add blocks. It’s like a race to solve a puzzle, and the winner gets to update the blockchain.',
  },
  {
    question: 'How does Proof-of-Stake differ from Proof-of-Work?',
    answer: 'Proof-of-Stake (PoS) selects validators based on the amount of cryptocurrency they “stake” rather than solving puzzles. It’s like voting with your money instead of computing power.',
  },
  {
    question: 'Why is consensus important for security?',
    answer: 'Consensus ensures all nodes agree on the same data, preventing double-spending or fraud. Without it, someone could trick the network into accepting fake transactions.',
  },
];

const quizQuestions = [
  {
    question: 'What does a consensus algorithm do?',
    options: [
      'Encrypts transactions',
      'Ensures all nodes agree on the blockchain state',
      'Generates digital signatures',
      'Stores data off-chain',
    ],
    correct: 1,
  },
  {
    question: 'What is a common consensus algorithm in Bitcoin?',
    options: [
      'Proof-of-Stake',
      'Proof-of-Work',
      'Delegated Proof-of-Stake',
      'Byzantine Fault Tolerance',
    ],
    correct: 1,
  },
  {
    question: 'Why might a network use Proof-of-Stake?',
    options: [
      'It’s more energy-intensive',
      'It’s faster and less energy-intensive',
      'It requires more nodes',
      'It’s less secure',
    ],
    correct: 1,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const ConsensusAlgorithm = () => {
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
      return "Perfect score! You're a consensus expert!";
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
          Consensus Algorithms
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16"
        >
          Discover how blockchain networks agree on a single truth, ensuring trust and security without a central authority.
        </motion.p>

        {/* Introduction */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">What is a Consensus Algorithm?</h2>
          <p className="text-gray-300 leading-relaxed">
            Imagine a group of friends deciding where to eat. They vote and agree on one restaurant. A consensus algorithm is like that vote—it helps blockchain computers (nodes) agree on the same transaction history, even if some try to cheat.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            It’s the rulebook for trust in a decentralized network, ensuring everyone has the same copy of the blockchain.
          </p>
        </motion.section>

        {/* Key Aspects */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Key Aspects</h2>

          {/* Proof-of-Work */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/consensus.svg" alt="Consensus Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Proof-of-Work</h3>
            </motion.div>
            <p className="text-gray-300">
              Nodes compete to solve a math puzzle. The winner adds a block and gets a reward. It’s secure but uses lots of energy.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: BinaryChain uses Proof-of-Work to validate blocks on the Mining page.</p>
            </motion.div>
          </div>

          {/* Proof-of-Stake */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/consensus.svg" alt="Consensus Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Proof-of-Stake</h3>
            </motion.div>
            <p className="text-gray-300">
              Nodes are chosen to add blocks based on how much cryptocurrency they “stake.” It’s faster and eco-friendly.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: Some blockchains use Proof-of-Stake for quicker transactions.</p>
            </motion.div>
          </div>

          {/* Fault Tolerance */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/consensus.svg" alt="Consensus Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Fault Tolerance</h3>
            </motion.div>
            <p className="text-gray-300">
              Consensus algorithms handle dishonest nodes, ensuring the network stays reliable even if some nodes fail or lie.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: BinaryChain’s consensus prevents fake transactions from being added.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works in Blockchain */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">How It Works in Blockchain</h2>
          <p className="text-gray-300 leading-relaxed">
            In BinaryChain, consensus algorithms keep the network honest:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <strong>Agreement</strong>: All nodes agree on valid transactions and blocks.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <strong>Security</strong>: Prevents double-spending by ensuring one true blockchain.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <strong>Decentralization</strong>: No single node controls the network.
            </motion.li>
          </ul>
          <motion.div
            className="mt-8 p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-emerald-400/20 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-300">
              Try it yourself! Visit the <Link href="/mine" className="text-emerald-400 hover:text-emerald-300">Mining Page</Link> to see consensus in action.
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
            You’ve learned about consensus algorithms! Explore more blockchain concepts or dive into BinaryChain’s features to see them in action.
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

export default ConsensusAlgorithm;