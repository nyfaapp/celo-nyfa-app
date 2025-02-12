"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig, http } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { useMemo } from 'react';

// Move configuration outside component
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet],
    },
  ],
  {
    appName: "Canvassing - Participant",
    projectId: String(),
  }
);

const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
});

// Create QueryClient instance outside component
const queryClient = new QueryClient();

// Create theme configuration outside component
const rainbowTheme = lightTheme({
  accentColor: "#EA5D5D",
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "rounded",
  overlayBlur: "small",
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={rainbowTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}