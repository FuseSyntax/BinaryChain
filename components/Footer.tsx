
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { EnvelopeIcon, GlobeAltIcon, DocumentTextIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const footerLinks = [
  { href: '/docs', label: 'Documentation', icon: DocumentTextIcon },
  { href: '/about', label: 'About', icon: InformationCircleIcon },
  { href: '/privacy', label: 'Privacy', icon: GlobeAltIcon },
];

const socialLinks = [
  { href: 'https://github.com', label: 'GitHub', icon: '/github.svg' },
  { href: 'https://twitter.com', label: 'Twitter', icon: '/twitter.svg' },
  { href: 'https://discord.com', label: 'Discord', icon: '/discord.svg' },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gray-900/30 backdrop-blur-md border-t border-emerald-400/20 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-gray-950 to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                BinaryChain
              </span>
            </div>
            <p className="text-gray-400 text-left">
              Empowering the future with decentralized technology and real-time blockchain visualizations.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex flex-col items-start z-10 relative">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">Explore</h3>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ x: 5, color: '#34D399' }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={link.href} className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors">
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social & Newsletter */}
          <div className="flex flex-col items-center md:items-start z-10 relative">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-gray-400 hover:text-emerald-400"
                >
                  <Image src={link.icon} alt={link.label} className="w-6 h-6" width={100} height={100} />
                </motion.a>
              ))}
            </div>
            <div className="flex w-full max-w-xs">
              <input
                type="email"
                placeholder="Subscribe to updates"
                className="flex-1 px-4 py-2 bg-gray-800/50 border border-emerald-400/30 rounded-l-lg text-gray-300 focus:outline-none focus:border-emerald-400"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-r-lg hover:bg-emerald-600">
                <EnvelopeIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 border-t border-gray-800 pt-8 text-center"
        >
          <p className="text-gray-500">
            © {new Date().getFullYear()} BinaryChain. Open source MIT license.
          </p>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[url('/circuit.svg')] opacity-10" />
    </motion.footer>
  );
};

export default Footer;
