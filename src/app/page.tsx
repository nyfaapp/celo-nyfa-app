"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Flex } from "@chakra-ui/react";
import { Spinner } from "@heroui/spinner";
import { useSupabase } from "@/providers/supabase-provider";

export default function Home() {
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
