"use client";

import { Provider } from "@/components/chakra/ui/provider";
import { Web3Provider } from "@/providers/web3-provider";
import { ColorModeProvider } from "@/components/chakra/ui/color-mode";
import SupabaseProvider from "@/providers/supabase-provider";
import RedirectProvider from "@/providers/redirect-provider";
import Header from "@/components/nyfa/header";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <Web3Provider>
        <ColorModeProvider forcedTheme="dark">
          <SupabaseProvider>
            <Header />
            <RedirectProvider>
              {children}
            </RedirectProvider>
          </SupabaseProvider>
        </ColorModeProvider>
      </Web3Provider>
    </Provider>
  );
}