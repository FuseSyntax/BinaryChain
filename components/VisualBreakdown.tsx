import { motion } from 'framer-motion';

interface VisualBreakdownProps {
  type: string;
}

const VisualBreakdown = ({ type }: VisualBreakdownProps) => {
  const getVisualContent = () => {
    switch (type) {
      case 'cryptography':
        return (
          <div className="h-32 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 bg-emerald-400 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-sm">Key</span>
            </motion.div>
          </div>
        );
      case 'ledger':
        return (
          <div className="h-32 flex gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ x: [0, 10, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center"
              >
                <span className="text-white text-xs">Block {i}</span>
              </motion.div>
            ))}
          </div>
        );
      case 'consensus':
        return (
          <div className="h-32 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-sm">PoW</span>
            </motion.div>
          </div>
        );
      case 'immutability':
        return (
          <div className="h-32 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 bg-purple-400 rounded-lg flex items-center justify-center"
            >
              <span className="text-white text-sm">Locked</span>
            </motion.div>
          </div>
        );
      case 'contracts':
        return (
          <div className="h-32 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 bg-red-400 rounded-lg flex items-center justify-center"
            >
              <span className="text-white text-sm">Contract</span>
            </motion.div>
          </div>
        );
      case 'p2p':
        return (
          <div className="h-32 flex gap-4 justify-center">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                className="w-12 h-12 bg-indigo-400 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-xs">Node {i}</span>
              </motion.div>
            ))}
          </div>
        );
      default:
        return <div className="h-32 bg-gray-600 rounded-lg flex items-center justify-center">No Visual</div>;
    }
  };

  return (
    <div className="border-t border-gray-600 pt-4">
      <h3 className="text-lg font-semibold text-emerald-400 mb-2">Visual Breakdown</h3>
      {getVisualContent()}
    </div>
  );
};

export default VisualBreakdown;
