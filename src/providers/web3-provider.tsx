'use client';
 
import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base, baseSepolia } from 'wagmi/chains'; // add baseSepolia for testing
 
export function Web3Provider(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID}
      chain={baseSepolia} // add baseSepolia for testing
      config={{
        appearance: {
          name: 'Nyfa App',        // Displayed in modal header          mode: 'auto',                 // 'light' | 'dark' | 'auto'
          theme: 'custom', 
          mode: 'dark'          // 'default' or custom theme
        },
        wallet: { 
          display: 'modal',  
        },
      }} // add baseSepolia for testing
    >
      {props.children}
    </OnchainKitProvider>
  );
}