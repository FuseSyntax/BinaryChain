import { motion } from 'framer-motion';
import VisualBreakdown from './VisualBreakdown';
import { BookOpenIcon } from '@heroicons/react/24/outline';

interface ConceptCardProps {
  title: string;
  description: string;
  implementation: string;
  visualType: string;
}

const ConceptCard = ({ title, description, implementation, visualType }: ConceptCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="p-6 bg-gray-700/30 rounded-xl border border-gray-600"
    >
      <div className="flex items-center gap-3 mb-4">
        <BookOpenIcon className="w-6 h-6 text-emerald-400" />
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-emerald-400">Implementation</h3>
        <p className="text-gray-400 text-sm">{implementation}</p>
      </div>
      <VisualBreakdown type={visualType} />
    </motion.div>
  );
};

export default ConceptCard;
