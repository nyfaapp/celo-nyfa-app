import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
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
      <body className={`${parkinsans.variable} antialiased bg-black`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
