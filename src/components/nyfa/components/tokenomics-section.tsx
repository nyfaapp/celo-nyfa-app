"use client";

import { Text, Flex } from "@chakra-ui/react";
import { Divider } from "@heroui/divider";
import { TokenomicsIcon } from "@/components/nyfa/svg-icons/tokenomics-icon";


interface TokenomicsProps {
    marketCap?: number;
    totalSupply?: number;
    circulatingSupply?: number;
  }
  
const TokenomicsSection: React.FC<TokenomicsProps> = ({
  marketCap,
  totalSupply,
  circulatingSupply,
}) => {
  return (
    <>
      <Flex direction="row" mt={2} p={2}>
        <TokenomicsIcon />
        <Text color="#0F1C33" fontSize="16px" fontWeight="bold" ml={2}>
          Tokenomics
        </Text>
      </Flex>

      <Flex direction="row" p={2} justify="space-between">
        <Text color="#0F1C33" fontSize="14px" fontWeight="normal">
          Market cap
        </Text>
        <Text color="#0F1C33" fontSize="16px" fontWeight="bold" ml={2}>
          USD {marketCap?.toLocaleString()}
        </Text>
      </Flex>

      <Flex direction="row" mt={2} p={2} justify="space-between">
        <Text color="#0F1C33" fontSize="14px" fontWeight="normal">
          Total supply
        </Text>
        <Text color="#0F1C33" fontSize="16px" fontWeight="bold" ml={2}>
          {totalSupply?.toLocaleString()}
        </Text>
      </Flex>

      <Flex direction="row" mt={2} p={2} justify="space-between">
        <Text color="#0F1C33" fontSize="14px" fontWeight="normal">
          Circulating supply
        </Text>
        <Text color="#0F1C33" fontSize="16px" fontWeight="bold" ml={2}>
          {circulatingSupply?.toLocaleString()}
        </Text>
      </Flex>
      <Divider className="" style={{ backgroundColor: "#0F1C33" }} />
    </>
  );
};

export default TokenomicsSection;