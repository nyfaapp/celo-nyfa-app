"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "./supabase-provider";
import { useAccount } from "wagmi";
import { Flex } from "@chakra-ui/react";
import { Spinner } from "@heroui/spinner";

export default function ConnectAndAuthGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSupabase();
  const router = useRouter();
  const { isConnected, isDisconnected } = useAccount();

  useEffect(() => {
    if (user) {
      router.push("/all-nofas");
    }

    if (isDisconnected) {
      router.push("/not-connected");
    }

    if (isConnected && !user) {
      router.push("/first-page");
    }
  }, [user, router, isConnected, isDisconnected]);

  if (!user) {
    return (
      <Flex
        // ref={flexRef}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        h={"75vh"}
      >
        <Spinner size="sm" color="default" />
      </Flex>
    );
  }

  return <>{children}</>;
}
