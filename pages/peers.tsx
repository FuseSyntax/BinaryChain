'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon, UsersIcon } from '@heroicons/react/24/outline';

const Peers = () => {
  const [peerUrl, setPeerUrl] = useState('');
  const [peers, setPeers] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPeers = async () => {
      const res = await fetch('/api/peers/list');
      const data = await res.json();
      setPeers(data.peers || []);
    };
    fetchPeers();
  }, []);

  const addPeer = async () => {
    const res = await fetch('/api/peers/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ peerUrl }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(`Error: ${data.error}`);
    } else {
      setMessage(data.message);
      const updatedRes = await fetch('/api/peers/list');
      const updatedData = await updatedRes.json();
      setPeers(updatedData.peers || []);
      setPeerUrl('');
    }
  };

  return (
    <div className="md:min-h-screen bg-gray-900 md:p-8 md:mt-20 mx-4 mt-24 mb-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-2xl md:p-8 p-4 border border-gray-700 shadow-2xl mb-8"
        >
          <h1 className="md:text-4xl text-2xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Manage Peers
          </h1>

          <div className="space-y-6">
            <div>
              <label className="text-gray-300 mb-2 block">Add Peer URL</label>
              <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-3 border border-gray-600">
                <UsersIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={peerUrl}
                  onChange={(e) => setPeerUrl(e.target.value)}
                  className="bg-transparent w-full text-gray-200 placeholder-gray-500 focus:outline-none"
                  placeholder="http://localhost:3000"
                />
              </div>
            </div>

            <motion.button
              onClick={addPeer}
              whileHover={{ scale: 1.05 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all"
            >
              <PlusIcon className="w-5 h-5" />
              Add Peer
            </motion.button>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.startsWith('Error')
                    ? 'bg-red-400/10 border-red-400/30'
                    : 'bg-emerald-400/10 border-emerald-400/30'
                }`}
              >
                <p className={message.startsWith('Error') ? 'text-red-400' : 'text-emerald-400'}>
                  {message}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Connected Peers</h2>
          {peers.length === 0 ? (
            <p className="text-gray-400">No peers connected</p>
          ) : (
            <ul className="space-y-4">
              {peers.map((peer, index) => (
                <li key={index} className="p-4 bg-gray-700 rounded-lg">
                  {peer}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Peers;