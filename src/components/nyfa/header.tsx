"use client";

import { Box, Flex } from "@chakra-ui/react";
// import OnchainKitWallet from "../chakra/ui/onchainkit-wallet";
import { HeaderLogo } from "./svg-icons/logos/header-logo";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <Box bg="#0F1C33" px={4} position="sticky" top="0" left="0" zIndex="1000">
      <Flex h={16} alignItems="center" justifyContent="space-between" w="full">
        <Link style={{ marginRight: "auto" }} href="/all-nofas">
          <HeaderLogo />
        </Link>

        <ConnectButton
          chainStatus="none"
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "avatar",
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
          label="Connect"
        />
      </Flex>
    </Box>
  );
};

export default Header;
