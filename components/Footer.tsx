// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 text-center p-4">
      <p>© {new Date().getFullYear()} BinaryChain. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
