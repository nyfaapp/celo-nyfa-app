"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "./supabase-provider";

export default function AuthRedirectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSupabase();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Handle all routing logic inside useEffect
    if (pathname === "/") {
      if (!user) {
        router.push("/first-page");
      } else {
        router.push("/your-nofas");
      }
      return;
    }

    // For routes other than first-page and your-nofas/*, redirect if not authenticated
    if (
      !user &&
      pathname !== "/first-page" &&
      !pathname?.startsWith("/your-nofas")
    ) {
      router.push("/first-page");
    }
  }, [user, pathname, router]);

  // Allow rendering of first-page regardless of auth state
  if (pathname === "/first-page") {
    return <>{children}</>;
  }

  // Allow rendering of your-nofas and its sub-routes when authenticated
  if (user && pathname?.startsWith("/your-nofas")) {
    return <>{children}</>;
  }

  // For all other routes, require authentication
  if (!user) {
    return null;
  }

  return <>{children}</>;
}
