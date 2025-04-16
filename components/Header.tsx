// components/Header.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-b from-gray-900 to-gray-800 border-b border-gray-700 backdrop-blur-xs"
    >
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-lg" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              BinaryChain
            </span>
          </Link>
        </motion.div>

        <div className="flex items-center gap-6">
          {[
            { path: '/status', label: 'Status' },
            { path: '/mine', label: 'Mine' },
            { path: '/transactions', label: 'Transactions' },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative px-3 py-1.5 transition-colors ${
                router.pathname === link.path
                  ? 'text-emerald-400'
                  : 'text-gray-300 hover:text-gray-100'
              }`}
            >
              {link.label}
              {router.pathname === link.path && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400"
                  layoutId="underline"
                />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;