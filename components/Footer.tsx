// components/Footer.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gray-900 border-t border-gray-800"
    >      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded" />
            <span className="text-lg cursor-pointer font-semibold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              BinaryChain
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-gray-400">
            <Link href="/docs" className="hover:text-emerald-400 transition-colors">
              Documentation
            </Link>
            <Link href="/about" className="hover:text-emerald-400 transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              Privacy
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} BinaryChain. Open source MIT license.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;