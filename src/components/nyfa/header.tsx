"use client";

import { Box, Flex, Link } from "@chakra-ui/react";
import OnchainKitWallet from "../chakra/ui/onchainkit-wallet";
import { HeaderLogo } from "./svg-icons/logos/header-logo";

const Header = () => {
  return (
    <Box bg="#0F1C33" px={4} position="sticky" top="0" left="0" zIndex="1000">
      <Flex h={16} alignItems="center" justifyContent="space-between" w="full">
        <Link style={{ marginRight: "auto" }} href="/all-nofas">
          <HeaderLogo />
        </Link>

        <OnchainKitWallet />
      </Flex>
    </Box>
  );
};

export default Header;
