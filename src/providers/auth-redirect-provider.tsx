"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "./supabase-provider";
import { useAccount } from "wagmi";

export default function AuthRedirectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSupabase();
  const { isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialized, setIsInitialized] = useState(false);

  // Base protected routes
  const protectedBaseRoutes = [
    "/all-nofas",
    "/create-your-nofa",
    "/your-nofas",
  ];

  const isProtectedRoute = () => {
    // Check base routes
    const isBaseRoute = protectedBaseRoutes.some((route) => pathname === route);
    if (isBaseRoute) return true;

    // Check dynamic routes
    const isAllNofasDetail = pathname?.startsWith("/all-nofas/");
    const isYourNofasDetail = pathname?.startsWith("/your-nofas/");

    return isAllNofasDetail || isYourNofasDetail;
  };

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
    }, 500);

    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    // Handle root route
    if (pathname === "/") {
      if (!user) {
        router.push("/first-page");
      } else {
        router.push("/all-nofas");
      }
      return;
    }

    // Handle first-page redirect for authenticated and connected users
    if (pathname === "/first-page" && user && isConnected) {
      router.push("/all-nofas");
      return;
    }

    // Only handle redirects for protected routes
    if (isProtectedRoute()) {
      if (!isConnected) {
        router.push("/first-page");
        return;
      }

      if (!user) {
        router.push("/first-page");
        return;
      }
    }
  }, [user, isConnected, pathname, router, isInitialized]);

  // During initialization, render children to prevent flicker
  if (!isInitialized) {
    return <>{children}</>;
  }

  // For first-page, check if user should be redirected
  if (pathname === "/first-page") {
    if (user && isConnected) {
      return null;
    }
    return <>{children}</>;
  }

  // For protected routes, require both auth and connection
  if (isProtectedRoute()) {
    if (!isConnected || !user) {
      return null;
    }
  }

  return <>{children}</>;
}
