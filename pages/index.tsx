// pages/index.tsx
import React, { useEffect, useState } from 'react';

interface Block {
  index: number;
  timestamp: number;
  transactions: any[];
  previousHash: string;
  hash: string;
  nonce: number;
}

const Home: React.FC = () => {
  const [chain, setChain] = useState<Block[]>([]);

  const fetchChain = async () => {
    const res = await fetch('/api/blockchain');
    const data = await res.json();
    setChain(data.chain);
  };

  useEffect(() => {
    fetchChain();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">BinaryChain - Blockchain Status</h1>
      <button onClick={fetchChain} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Refresh Blockchain
      </button>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(chain, null, 2)}
      </pre>
    </div>
  );
};

export default Home;
