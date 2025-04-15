// components/MiningInfo.tsx
import React from 'react';

interface MiningInfoProps {
  difficulty: number;
  pendingTransactionsCount: number;
}

const MiningInfo: React.FC<MiningInfoProps> = ({ difficulty, pendingTransactionsCount }) => {
  return (
    <div className="p-4 bg-green-100 rounded shadow">
      <p>Difficulty: {difficulty}</p>
      <p>Pending Transactions: {pendingTransactionsCount}</p>
    </div>
  );
};

export default MiningInfo;
