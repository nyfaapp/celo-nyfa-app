"use client";

import { Box, Text } from "@chakra-ui/react";
import { Avatar, Name } from "@coinbase/onchainkit/identity";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";

const OnchainKitWallet = () => {
  return (
    <Box>
      <Wallet>
        <ConnectWallet text="Connect">
          <Avatar className="h-6 w-6" />
          {/* <Name /> */}
        </ConnectWallet>
        <WalletDropdown>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </Box>
  );
};

export default OnchainKitWallet;
