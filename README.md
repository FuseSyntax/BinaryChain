BinaryChain
BinaryChain is an educational blockchain platform built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Prisma. It provides interactive learning experiences for blockchain concepts, including cryptographic security, peer-to-peer networks, smart contracts, and more. Users can explore blockchain features, view transactions, mine blocks, and engage with quizzes and visualizations.
Features

Interactive Concept Pages: Learn about blockchain concepts like Cryptographic Security, P2P Networks, Smart Contracts, Distributed Ledgers, Consensus Algorithms, and Immutable Records through quizzes and FAQs.
Blockchain Visualization: View blockchain data, transactions, and mining stats with dynamic components.
API Endpoints: Manage blockchain data (blocks, transactions, peers) via RESTful APIs.
Responsive Design: Cyberpunk-themed UI with neon gradients and glassmorphism, optimized for desktop and mobile.
Prisma ORM: SQLite/PostgreSQL database for storing blockchain data.


Prerequisites

Node.js (v18 or higher)
npm or yarn
SQLite or PostgreSQL (for Prisma)

Setup

Clone the Repository:
git clone https://github.com/your-username/binarychain.git
cd binarychain


Install Dependencies:
npm install


Set Up Environment Variables:

Copy .env.example to .env (or create .env):DATABASE_URL="file:./dev.db" # SQLite or PostgreSQL URL


Update DATABASE_URL if using PostgreSQL.


Initialize Database:
npx prisma migrate dev --name init


Run the Development Server:
npm run dev


Open http://localhost:3000 in your browser.



Usage

Home Page: Explore blockchain features and navigate to concept pages.
Concepts: Learn about blockchain concepts with interactive quizzes and FAQs.
Mine: View mining stats and simulate block mining.
Transactions: See transaction history and create new transactions.
Peers: Manage and view connected peers in the P2P network.
Status: Check blockchain health and stats.

API Endpoints

GET /api/blockchain: Fetch blockchain stats (blocks, transactions, peers).
POST /api/transaction: Create a new transaction.
GET /api/peers/list: List connected peers.
POST /api/peers/add: Add a new peer.
POST /api/blockchain/receive: Sync blockchain data.

Contributing

Fork the repository.
Create a new branch: git checkout -b feature/your-feature.
Make changes and commit: git commit -m "Add your feature".
Push to your fork: git push origin feature/your-feature.
Open a pull request.

License
MIT License. See LICENSE for details.
Contact
For questions or support, email support@binarychain.com or join our Discord.
