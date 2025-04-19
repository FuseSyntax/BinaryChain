'use client';

import { motion } from 'framer-motion';
import ConceptCard from '../components/ConceptCard';
import Link from 'next/link';

const concepts = [
  {
    title: 'Cryptographic Security',
    description: 'Ensures transaction integrity and wallet security using elliptic curve cryptography.',
    implementation: 'Implemented in lib/wallet.ts (key pair generation, transaction signing) and lib/cryptoUtil.ts (hashing). Uses ECDSA for signing transactions.',
    visualType: 'cryptography',
    link: "/cryptographic",
  },
  {
    title: 'Distributed Ledger',
    description: 'A decentralized record of all transactions maintained across nodes.',
    implementation: 'Managed in lib/blockchain.ts (chain array) and persisted via prisma/schema.prisma. Nodes sync via /api/blockchain/receive.',
    visualType: 'ledger',
    link: "/distributed-ledger",
  },
  {
    title: 'Consensus Algorithm',
    description: 'Uses Proof-of-Work to agree on the valid chain state.',
    implementation: 'Implemented in lib/block.ts (mineBlock method) and lib/blockchain.ts (difficulty adjustment).',
    visualType: 'consensus',
    link: "/consensus-algorithm",
  },
  {
    title: 'Immutable Records',
    description: 'Ensures blocks cannot be altered once added to the chain.',
    implementation: 'Enforced in lib/blockchain.ts (isChainValid method) by checking hash integrity and previousHash links.',
    visualType: 'immutability',
    link: "/immutable-records",
  },
  {
    title: 'Smart Contracts',
    description: 'Programmable logic to automate transactions (placeholder for future implementation).',
    implementation: 'Not yet implemented. Planned for lib/contract.ts and execution in transactions.',
    visualType: 'contracts',
    link: "/smart-contracts",
  },
  {
    title: 'Peer-to-Peer Network',
    description: 'Nodes communicate to share blocks and transactions.',
    implementation: 'Managed in lib/blockchain.ts (peers Set, broadcastBlock) and api/peers/add.ts, api/peers/list.ts endpoints.',
    visualType: 'p2p',
    link: "/p2p-network",
  },
];

const Concepts = () => {
  return (
    <div className="min-h-screen bg-gray-900 md:p-8 md:mt-20 mx-4 mt-24 mb-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-2xl md:p-8 p-4 border border-gray-700 shadow-2xl"
        >
          <h1 className="md:text-4xl text-2xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Blockchain Concepts
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concepts.map((concept, index) => (
              <Link key={index} href={concept.link}>
                <ConceptCard
                  title={concept.title}
                  description={concept.description}
                  implementation={concept.implementation}
                  visualType={concept.visualType}
                />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Concepts;