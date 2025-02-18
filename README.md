# Celo Nyfa App - AI-Powered Crypto Research Platform
> Automated Crypto Report NFT Generator on Celo

👧🏾 **Nyfa** - Not Your Financial Advisor (Human Name: Nyla)  
🖼️ **NoFA** - Not Financial Advice

![nyfa](https://github.com/user-attachments/assets/3e14c649-5050-4a62-8f45-54bce4fc2af4)

## What is Nyfa?
A Next.js-based Web3 application that automatically generates and mints detailed crypto asset reports as NFTs on the Celo network, covering over 17,000 cryptocurrencies.

## How It Works

### 1. Research Generation
Users select from 17,000+ crypto assets to receive an auto-generated report containing:
- Market capitalization and price trends
- News sentiment analysis and headlines
- Real-time market data
- Dynamic visualizations

### 2. Automated NFT Minting
The report becomes a "NoFA NFT" on Celo through:
- HTML2Canvas report generation
- IPFS storage via Pinata
- ERC721URIStorage smart contract
- Seamless wallet integration

### 3. Proof of Research
NoFA NFTs serve as:
- Verifiable proof of due diligence
- Shareable research artifacts
- Historical record of analysis

## Features

- NoFA Report Generation
- Web3 Wallet Integration
- Supabase Authentication & Storage
- IPFS Integration via Pinata
- Celo Network Support (Alfajores for testing)
- News Sentiment Analysis
- Support for 17,000+ cryptocurrencies

## Tech Stack

- **Frontend**: Next.js
- **Authentication**: Supabase
- **Storage**: 
  - IPFS (Pinata)
  - Supabase Postgres
- **Blockchain**: Celo Network (Alfajores Testnet)
- **Smart Contracts**: Solidity (OpenZeppelin ERC721URIStorage)
- **Data Sources**:
  - CoinGecko API
  - CryptoNews API

## Database Schema

<img width="995" alt="Screenshot 2025-02-08 at 23 37 22" src="https://github.com/user-attachments/assets/1e686232-7b3b-4fa4-8094-6c96d46e3fe4" />

## Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- npm or yarn
- Web3 wallet (Metamask or any EIP-1193 provider)

### Quick Start
1. Clone and install:
```bash
git clone https://github.com/nyfaapp/celo-nyfa-app
cd celo-nyfa-app
npm install  # or yarn install
```

2. Configure environment:
Create `.env` file with the following:
```env
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
PRIVY_APP_ID=""
PRIVY_APP_SECRET=""
PRIVY_WALLET_AUTH_PRIVATE_KEY=""
PRIVY_VERIFICATION_KEY=""
COINGECKO_API_KEY=""
CRYPTONEWS_API_KEY=""
PINATA_JWT=""
NEXT_PUBLIC_GATEWAY_URL=""
PINATA_API_KEY=""
PINATA_API_SECRET=""
DRPC_API_KEY=""
NEXT_PUBLIC_MIXPANEL_TOKEN=""
```

3. Launch development server:
```bash
npm run dev  # or yarn dev
```

## Roadmap

### Month 1
- RainbowKit Integration
- Celo Alfajores Testnet Deployment
- Enhanced Report Generation

### Month 2
- Implement Paywall System
- Expanded Cryptocurrency Coverage
- Advanced Analytics Features

### Month 3
- Nyla AI Integration
- Enhanced User Experience
- Production Network Migration

## Powered By
- [Celo](https://celo.org/) - Blockchain platform
- [Supabase](https://supabase.com/) - Authentication & Database
- [CoinGecko](https://www.coingecko.com/) - Crypto market data
- [CryptoNews](https://cryptonews-api.com/) - News aggregation
- [Pinata](https://www.pinata.cloud/) - IPFS storage
