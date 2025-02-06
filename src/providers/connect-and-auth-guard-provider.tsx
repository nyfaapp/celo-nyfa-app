"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "./supabase-provider";
import { useAccount } from "wagmi";

export default function ConnectAndAuthGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSupabase();
  const router = useRouter();
  const { isConnected, isDisconnected } = useAccount();

  useEffect(() => {
    if (isDisconnected) {
      router.push("/not-connected");
    }

    if (isConnected) {
      if (user) {
        router.push("/all-nofas");
      } else {
        router.push("/first-page");
      }
    }
  }, [user, router, isConnected, isDisconnected]);

  if (!user) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
