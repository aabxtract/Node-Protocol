# Node Protocol

A decentralized staking platform built on the Stacks blockchain, offering flexible staking options with competitive rewards.

## Overview

Node Protocol provides two distinct staking mechanisms:
- **Short-term Node Staking** - Stake STX for 7, 15, or 30 days
- **Long-term Lock Vaults** - Lock STX for 3, 6, or 12 months with higher rewards

## Features

### 🚀 Short-term Node Staking
- **Flexible periods**: 7, 15, or 30 days
- **Competitive APR**: 2%, 3%, 4% respectively
- **Minimum stake**: 1 STX
- **Quick rewards**: Earn rewards on shorter timeframes

### 🔒 Long-term Lock Vaults
- **Extended periods**: 3, 6, or 12 months
- **Higher returns**: 5%, 8%, 12% APR respectively
- **Minimum lock**: 10 STX
- **Maximum rewards**: Best returns for long-term commitment

### ✨ Core Functionality
- **Stake/Lock STX** - Deposit your tokens for the selected period
- **Claim Rewards** - Withdraw accumulated rewards anytime
- **Unstake/Unlock** - Retrieve your principal plus remaining rewards after the lock period

## Smart Contracts

### Deployed on Stacks Testnet

**Lock Contract (Long-term)**
```
ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.lock
```

**Node Contract (Short-term)**
```
ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.node
```

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Blockchain**: Stacks blockchain (Clarity smart contracts)
- **Wallet Integration**: @stacks/connect, @stacks/transactions

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Stacks wallet (Hiro Wallet, Xverse, etc.)
- Testnet STX tokens

### Installation

1. Clone the repository
```bash
git clone https://github.com/aabxtract/Node-Protocol.git
cd Node-Protocol
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
Node-Protocol/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── long-run-vaults.tsx    # Long-term staking UI
│   │   ├── node-staking.tsx       # Short-term staking UI
│   │   └── ui/           # Reusable UI components
│   └── lib/              # Utility functions
├── node-stake/
│   ├── contracts/        # Clarity smart contracts
│   │   ├── lock.clar     # Long-term staking contract
│   │   ├── node.clar     # Short-term staking contract
│   │   └── txn.clar      # Transaction dispersal contract
│   └── tests/            # Contract tests
└── public/               # Static assets
```

## Smart Contract Functions

### Lock Contract (Long-term)
- `lock-stx(amount, months)` - Lock STX for 3, 6, or 12 months
- `claim-rewards()` - Claim accumulated rewards
- `unlock-stx()` - Unlock and withdraw after period expires
- `calculate-rewards(user)` - View pending rewards
- `get-lock-position(user)` - View lock details

### Node Contract (Short-term)
- `stake-stx(amount, days)` - Stake STX for 7, 15, or 30 days
- `claim-rewards()` - Claim accumulated rewards
- `unstake-stx()` - Unstake and withdraw after period expires
- `calculate-rewards(user)` - View pending rewards
- `get-staking-position(user)` - View stake details

## Reward Calculation

Rewards are calculated using the formula:
```
rewards = (amount × rate × blocks_staked) / (10000 × annual_blocks)
```

Where:
- `amount` = Staked amount in microSTX
- `rate` = Reward rate in basis points (e.g., 500 = 5%)
- `blocks_staked` = Number of blocks the STX has been staked
- `annual_blocks` = ~52,560 blocks per year

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

- **GitHub**: [@aabxtract](https://github.com/aabxtract)
- **Repository**: [Node-Protocol](https://github.com/aabxtract/Node-Protocol)

## Disclaimer

This is experimental software. Use at your own risk. Always test on testnet before using real funds.
