"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "./supabase-provider";
import { useAccount } from "wagmi";

export default function RedirectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSupabase();
  const router = useRouter();
  const { isConnected } = useAccount();
  const pathname = usePathname();

  useEffect(() => {
    // Never redirect from NoFA detail pages
    if (pathname?.startsWith("/your-nofas/")) {
      return;
    }

    // Handle specific paths first
    if (pathname === "/not-connected" && !isConnected) {
      return;
    }

    if (pathname === "/first-page" && isConnected && !user) {
      return;
    }

    // Then handle redirects
    if (!isConnected) {
      router.push("/not-connected");
      return;
    }

    if (!user) {
      router.push("/first-page");
      return;
    }

    if (pathname === "/") {
      router.push("/your-nofas");
    }
  }, [isConnected, user, pathname]);

  const shouldRenderChildren =
    user || pathname === "/not-connected" || pathname === "/first-page";

  if (!shouldRenderChildren) {
    return null;
  }

  return <>{children}</>;
}
