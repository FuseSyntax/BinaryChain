// pages/mine.tsx
import React, { useState } from 'react';

const Mine: React.FC = () => {
  const [rewardAddress, setRewardAddress] = useState('');
  const [message, setMessage] = useState('');

  const mineBlock = async () => {
    const res = await fetch('/api/blockchain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ miningRewardAddress: rewardAddress }),
    });
    const data = await res.json();
    setMessage('Block mined! Check the Home page for the updated blockchain.');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Mine a Block</h1>
      <input
        type="text"
        placeholder="Wallet Public Key (Reward Address)"
        value={rewardAddress}
        onChange={(e) => setRewardAddress(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <button onClick={mineBlock} className="bg-green-500 text-white px-4 py-2 rounded">
        Mine Block
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Mine;
