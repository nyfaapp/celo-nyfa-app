"use client";

import { Flex } from "@chakra-ui/react";
import { Spinner } from "@heroui/spinner";

export default function Home() {
  return (
    <Flex
      // ref={flexRef}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      h={"75vh"}
    >
      <Spinner size="sm" />
    </Flex>
  );
}
