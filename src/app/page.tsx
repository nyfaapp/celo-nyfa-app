"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Flex } from "@chakra-ui/react";
import { Spinner } from "@heroui/spinner";

export default function Home() {
  const { isConnected, isDisconnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.replace("/all-nofas");
    } else if (isDisconnected) {
      router.replace("/not-connected");
    }
  }, [isConnected, isDisconnected, router]);

  // Display a loading state while redirecting
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
