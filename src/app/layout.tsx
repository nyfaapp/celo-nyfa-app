import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/chakra/ui/provider";
import { Web3Provider } from "@/providers/web3-provider";
import "@coinbase/onchainkit/styles.css";
import "./onchain-overrides.css";
import { ColorModeProvider } from "@/components/chakra/ui/color-mode";
import SupabaseProvider from "@/providers/supabase-provider";
import Header from "@/components/nyfa/header";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${parkinsans.className} bg-white`}>
        <Provider>
          <Web3Provider>
            <Header />
            <ColorModeProvider forcedTheme="dark">
              <SupabaseProvider>{children}</SupabaseProvider>
            </ColorModeProvider>
          </Web3Provider>
        </Provider>
      </body>
    </html>
  );
}
