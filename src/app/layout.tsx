import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import "./onchain-overrides.css";
import MainProvider from "@/providers/main-provider";

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
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
