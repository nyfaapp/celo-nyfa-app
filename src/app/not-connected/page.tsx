"use client";

import { BodyLogoFirstPage } from "@/components/nyfa/svg-icons/logos/body-logo-first-page";
import { BodyLogoNotConnected } from "@/components/nyfa/svg-icons/logos/body-logo-not-connected";
import { Button, Text, Flex, Box } from "@chakra-ui/react";
import { useAccount, useConnect } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotConnected() {
  const { isConnected, isDisconnected, isConnecting } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);

  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        h={"75vh"}
      >
        {isConnected ? <BodyLogoFirstPage /> : <BodyLogoNotConnected />}

        <Text color={"#0F1C33"} fontSize={"40px"} fontWeight={"bold"} mt={8}>
          {isConnected ? "connected*" : "not connected*"}
        </Text>

        {isDisconnected && (
          <Button
            bgColor={"#FDBB23"}
            borderRadius={15}
            mt={12}
            px={16}
            w={"3/6"}
            loading={isConnecting}
          >
            <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"}>
              {isConnecting ? "Connecting..." : "Connect"}
            </Text>
          </Button>
        )}
      </Flex>

      <Box bg="#0F1C33" position="absolute" bottom="0" right="0" py={4}>
        <Text
          color={"white"}
          fontSize={"14px"}
          fontWeight={"normal"}
          mx={16}
          textAlign={"center"}
        >
          If you are *connected, you will be able to create a NoFA.
        </Text>
      </Box>
    </>
  );
}
