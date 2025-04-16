// components/TransactionList.tsx
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const TransactionList = ({ transactions }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Transaction Pool</h3>
      {transactions.map((tx, index) => (
        <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-emerald-400 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-400/10 rounded-lg">
                <ArrowUpIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">From {tx.fromAddress?.slice(0, 12)}...</p>
                <p className="text-sm text-gray-400">To {tx.toAddress?.slice(0, 12)}...</p>
              </div>
            </div>
            <p className="text-lg font-semibold text-emerald-400">{tx.amount}</p>
          </div>
          {tx.signature && (
            <p className="text-xs text-gray-500 break-all mt-2">
              Signature: {tx.signature.slice(0, 24)}...
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransactionList;