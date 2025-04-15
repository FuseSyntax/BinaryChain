// components/Header.tsx
import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="font-bold text-xl">BinaryChain</h1>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/mine">Mine</Link>
          <Link href="/transactions">Transactions</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
