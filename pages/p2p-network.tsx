'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const faqs = [
  {
    question: 'How does a P2P network differ from a client-server network?',
    answer: 'In a client-server network, clients connect to a central server. In a P2P network, all nodes are equal, sharing data directly with each other, like friends passing notes.',
  },
  {
    question: 'What happens if a node goes offline?',
    answer: 'The P2P network continues to function as long as other nodes are online, thanks to its decentralized structure.',
  },
  {
    question: 'How does a P2P network stay secure?',
    answer: 'Cryptography and consensus ensure nodes only share valid data, preventing malicious nodes from spreading false information.',
  },
];

const quizQuestions = [
  {
    question: 'What is a P2P network?',
    options: [
      'A centralized server system',
      'A network where nodes share data directly',
      'A single computer network',
      'A cloud-based storage system',
    ],
    correct: 1,
  },
  {
    question: 'What’s a benefit of a P2P network?',
    options: [
      'Centralized control',
      'Single point of failure',
      'Resilience to node failures',
      'Slower data sharing',
    ],
    correct: 2,
  },
  {
    question: 'How does BinaryChain use P2P networks?',
    options: [
      'To store data centrally',
      'To share transactions and blocks',
      'To encrypt data',
      'To mine blocks only',
    ],
    correct: 1,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const P2PNetwork = () => {
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
      return "Perfect score! You're a P2P expert!";
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
          Peer-to-Peer Network
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16"
        >
          Explore how peer-to-peer networks enable decentralized communication in blockchain, powering BinaryChain’s resilience.
        </motion.p>

        {/* Introduction */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">What is a P2P Network?</h2>
          <p className="text-gray-300 leading-relaxed">
            Imagine a group of friends sharing music files directly with each other, without a central server. A peer-to-peer (P2P) network is like that—computers (nodes) in a blockchain share data directly, with no middleman.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            This decentralization makes the network robust and censorship-resistant.
          </p>
        </motion.section>

        {/* Key Aspects */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">Key Aspects</h2>

          {/* Decentralized Communication */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/p2p.svg" alt="P2P Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Decentralized Communication</h3>
            </motion.div>
            <p className="text-gray-300">
              Nodes connect directly, sharing transactions and blocks without a central server.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: BinaryChain’s peers share data on the Peers page.</p>
            </motion.div>
          </div>

          {/* Resilience */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20 mb-8">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/p2p.svg" alt="P2P Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Resilience</h3>
            </motion.div>
            <p className="text-gray-300">
              If one node fails, others keep the network running, ensuring no single point of failure.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: BinaryChain’s P2P network stays active even if nodes drop offline.</p>
            </motion.div>
          </div>

          {/* Security */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-400/20">
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image width={100} height={100} src="/p2p.svg" alt="P2P Icon" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">Security</h3>
            </motion.div>
            <p className="text-gray-300">
              Cryptographic signatures and consensus verify data shared between nodes, preventing fraud.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gray-700/20 rounded-lg"
            >
              <p className="text-gray-400 italic">Example: BinaryChain’s P2P network ensures only valid transactions are shared.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works in Blockchain */}
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-16">
          <h2 className="text-3xl font-semibold text-emerald-400 mb-6">How It Works in Blockchain</h2>
          <p className="text-gray-300 leading-relaxed">
            In BinaryChain, the P2P network powers decentralization:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <strong>Data Sharing</strong>: Nodes broadcast transactions and blocks to each other.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <strong>Reliability</strong>: The network stays active despite node failures.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <strong>Security</strong>: Cryptography ensures shared data is trustworthy.
            </motion.li>
          </ul>
          <motion.div
            className="mt-8 p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-emerald-400/20 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-300">
              Try it yourself! Visit the <Link href="/peers" className="text-emerald-400 hover:text-emerald-300">Peers Page</Link> to see the P2P network.
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
            You’ve learned about peer-to-peer networks! Explore more blockchain concepts or dive into BinaryChain’s features to see them in action.
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
              href="/peers"
              className="md:px-8 px-4 md:py-4 py-2 bg-transparent border-2 border-emerald-400 text-emerald-400 rounded-xl hover:bg-emerald-400 hover:text-white transition-all"
 >
              View Peers
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default P2PNetwork;