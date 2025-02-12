import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import MainProvider from "@/providers/main-provider";

const parkinsans = Parkinsans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Celo Nyfa App",
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
