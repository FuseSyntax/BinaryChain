// components/MiningInfo.tsx
import { CpuChipIcon, QueueListIcon } from '@heroicons/react/24/outline';

interface MiningInfoProps {
  difficulty: number;
  pendingTransactionsCount: number;
}

const MiningInfo: React.FC<MiningInfoProps> = ({ difficulty, pendingTransactionsCount }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-6 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Mining Status</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-400/10 rounded-lg">
            <CpuChipIcon className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Difficulty</p>
            <p className="text-xl font-semibold text-white">{difficulty}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-400/10 rounded-lg">
            <QueueListIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Pending TXs</p>
            <p className="text-xl font-semibold text-white">{pendingTransactionsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiningInfo;