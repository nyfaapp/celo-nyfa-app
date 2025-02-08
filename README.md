# Nyfa App - Powered by Privy Server Wallets and Coinbase's AgentKit


👧🏾 Nyfa - Not Your Financial Advisor

🖼️ NoFA - Not Financial Advice

![nyfa](https://github.com/user-attachments/assets/3e14c649-5050-4a62-8f45-54bce4fc2af4)

A Next.js-based AI-Agent-Driven Web3 application for:
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
- Web3 Wallet Integration (Coinbase's OnchainKit)
- Supabase Database Integration
- Privy Server Wallets
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
  - AgentKit (with Privy server wallet integration)
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

## Integration Example

Here's how AgentKit and Privy server wallets are integrated in the application:

```typescript
// Initialize AgentKit with Privy server wallet
// src/config/init-agent.ts
import { createViemAccount } from "@privy-io/server-auth/viem";
import { AgentKit, ViemWalletProvider } from "@coinbase/agentkit";
import { createWalletClient, http } from "viem";
import { baseSepolia } from "viem/chains";

async function getAgentKitFromPrivy(privyWalletId: string) {
  // Get the wallet from Privy
  const privyWallet = await privy.walletApi.getWallet({ id: privyWalletId });

  // Create Viem account using Privy's server wallet
  const account = await createViemAccount({
    walletId: privyWallet.id,
    address: privyWallet.address,
    privy,
  });

  // Create wallet client for Base Sepolia
  const client = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(`https://lb.drpc.org/ogrpc?network=base-sepolia&dkey=${process.env.DRPC_API_KEY}`),
  });

  // Create wallet provider and initialize AgentKit
  const walletProvider = new ViemWalletProvider(client);
  return await AgentKit.from({
    walletProvider,
    actionProviders: [wallet, cdp, erc721, erc721uristorage],
  });
}
```

The application includes a custom ERC721URIStorage action provider for minting NFTs:

```typescript
// src/config/get-agentkit.ts
const erc721uristorage = customActionProvider<EvmWalletProvider>({
  name: "erc721_uristorage",
  description: "Mint ERC721URIStorage NFTs",
  schema: mintParamsSchema,
  invoke: async (walletProvider, args) => {
    const { to, uri, contractAddress } = args;

    // Define the ABI for the mint function
    const abi = parseAbi([
      "function mint(address to, string memory uri) public returns (uint256)",
    ]);

    // Encode the function call
    const data = encodeFunctionData({
      abi,
      functionName: "mint",
      args: [to, uri],
    });

    // Send the transaction
    const hash = await walletProvider.sendTransaction({
      to: contractAddress,
      data,
      value: BigInt(0),
    });

    return {
      success: true,
      hash,
      message: `Successfully initiated mint transaction with hash: ${hash}`,
    };
  },
});
```

This integration enables:
- Secure server-side wallet management through Privy
- Automated blockchain interactions via AgentKit's action providers
- Custom NFT minting with on-chain metadata storage using ERC721URIStorage
- Gasless transactions for end users
- Integration with Base Sepolia testnet
