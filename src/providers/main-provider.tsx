"use client";

import { Provider } from "@/components/chakra/ui/provider";
import { Web3Provider } from "@/providers/web3-provider";
import { ColorModeProvider } from "@/components/chakra/ui/color-mode";
import SupabaseProvider from "@/providers/supabase-provider";
import AuthRedirectProvider from "@/providers/auth-redirect-provider";
import Header from "@/components/nyfa/header";
import MobileOnlyProvider from "./mobile-only-provider";
import ResponsiveLayoutProvider from "./responsive-layout-provider";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <ResponsiveLayoutProvider
        config={{
          maxMobileWidth: 768, // Adjust to your definition of mobile
          maxContentWidth: 480, // Width of the container on desktop
          desktopBackgroundColor: "#A9CEEB", // Background color outside the container
          showMobileBorder: true, // Show border around mobile view on desktop
        }}
      >
        <Web3Provider>
          <ColorModeProvider forcedTheme="dark">
            <SupabaseProvider>
              <Header />
              <AuthRedirectProvider>{children}</AuthRedirectProvider>
            </SupabaseProvider>
          </ColorModeProvider>
        </Web3Provider>
      </ResponsiveLayoutProvider>
    </Provider>
  );
}
