# Nyfa App

A Next.js-based Web3 application for:
1. Creating PNG files from NoFA templates that give information about a crypto asset (market cap, news sentiment, etc).
2. Minting these PNG files as NFTs on the Base network.

## Overview

Nyfa App is a decentralized application that streamlines crypto research and verification through innovative "NoFA" (Not Financial Advice) tokens. Here's how it works:

1. **Research Generation**: Users select a crypto asset and receive an automatically generated PNG file containing key metrics:
   - Market capitalization
   - Price trends
   - News sentiment analysis

2. **Automated NFT Minting**: The PNG is automatically minted as a "NoFA NFT" on the Base network through:
   - AgentKit integration (Coinbase Developer Platform)
   - Privy server wallets for gasless transactions
   - Zero blockchain interaction required from users

3. **Proof of Research**: These NoFA NFTs serve as:
   - Verifiable proof of due diligence
   - Shareable research artifacts
   - Historical record of analysis

The platform emphasizes simplicity: users focus on research while our automated systems handle all blockchain interactions behind the scenes.

## Features

- NoFA Token Minting
- Web3 Wallet Integration (Coinbase Wallet)
- Supabase Database Integration
- Privy Authentication
- Base Network Support (Base Sepolia for testing)
- News Sentiment Analysis
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15.1.6
- **Styling**: Tailwind CSS
- **Authentication**: Privy
- **Database**: Supabase
- **Blockchain**:
  - Base Network (Sepolia Testnet)
  - Wagmi
  - OnchainKit
- **Smart Contracts**: Solidity (OpenZeppelin)

## Prerequisites

- Node.js (Latest LTS version)
- npm or yarn
- Web3 wallet (Coinbase Wallet recommended)
- Environment variables setup

## Installation

1. Clone the repository:

```bash
git clone https://github.com/andrewkimjoseph/nyfa-app.git
cd nyfa-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=""
NEXT_PUBLIC_CDP_PROJECT_ID= ""
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
PRIVY_APP_ID=""
PRIVY_APP_SECRET=""
PRIVY_WALLET_AUTH_PRIVATE_KEY=""
PRIVY_VERIFICATION_KEY=""
QWEN_API_KEY=""
COINGECKO_API_KEY=""
CRYPTONEWS_API_KEY=""
PINATA_JWT=""
NEXT_PUBLIC_GATEWAY_URL=""
PINATA_API_KEY=""
PINATA_API_SECRET=""
CDP_API_KEY_NAME=""
CDP_API_KEY_PRIVATE_KEY=""
DRPC_API_KEY=""
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Technologies used:
- AgentKit by Coinbase: https://docs.cdp.coinbase.com/agentkit/docs/welcome
- OnchainKit: https://portal.cdp.coinbase.com/products/onchainkit
- Privy Server Wallets: https://docs.privy.io/guide/server-wallets/