import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import Header from "@/components/ui/header";

import { Web3Provider } from "@/providers/web3-provider";
import '@coinbase/onchainkit/styles.css';
import './onchain-overrides.css';

const parkinsans = Parkinsans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nyfa App",
  description: "Create Your NoFA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${parkinsans.className} bg-white`}>
        <Provider>
          <Web3Provider>
            <Header />
            {children}
          </Web3Provider>
        </Provider>
      </body>
    </html>
  );
}
