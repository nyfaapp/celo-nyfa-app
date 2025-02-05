"use client";

import { Box, Flex, Link } from "@chakra-ui/react";
import { HeaderLogo } from "../svg-icons/logos/header-logo";
import OnchainKitWallet from "./onchainkit-wallet";

const Header = () => {
  return (
    <Box bg="#0F1C33" px={4} position="sticky" top="0" left="0" zIndex="1000">
      <Flex h={16} alignItems="center" justifyContent="space-between" w="full">
        <Link style={{ marginRight: "auto" }} href="/">
          <HeaderLogo />
        </Link>

        <OnchainKitWallet />
      </Flex>
    </Box>
  );
};

export default Header;
