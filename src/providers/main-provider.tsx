"use client";

import { Provider } from "@/components/chakra/ui/provider";
import { Web3Provider } from "@/providers/web3-provider";
import { ColorModeProvider } from "@/components/chakra/ui/color-mode";
import SupabaseProvider from "@/providers/supabase-provider";
import AuthRedirectProvider from "@/providers/auth-redirect-provider";
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
            <AuthRedirectProvider>
              {children}
            </AuthRedirectProvider>
          </SupabaseProvider>
        </ColorModeProvider>
      </Web3Provider>
    </Provider>
  );
}