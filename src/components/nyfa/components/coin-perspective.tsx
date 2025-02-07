"use client";

import { Text, Flex, Box } from "@chakra-ui/react";
import { Divider } from "@heroui/divider";
import { StarIcon } from "@/components/nyfa/svg-icons/star-icon";
import { SmileyIcon } from "@/components/nyfa/svg-icons/smiley-icon";
import PriceWithChart from "@/components/nyfa/coin-perspective/price-with-chart";
import ETHPriceComparison from "@/components/nyfa/coin-perspective/eth-price-comparison";

interface CoinPerspectiveProps {
    coinId: string | null;
  }

const CoinPerspectiveSection: React.FC<CoinPerspectiveProps> = ({ coinId }) => {
  return (
    <>
      <Flex direction="row" mt={2} p={2}>
        <StarIcon />
        <Text color="#0F1C33" fontSize="16px" fontWeight="bold" ml={2}>
          Token price and chart
        </Text>
      </Flex>

      <Box py={2}>
        <PriceWithChart coinId={coinId} />
      </Box>

      <Flex direction="row" mt={2} p={2}>
        <SmileyIcon />
        <Text color="#0F1C33" fontSize="16px" fontWeight="bold" ml={2}>
          What if your crypto was like ETH?
        </Text>
      </Flex>

      <Box py={2}>
        <ETHPriceComparison vs={coinId} />
      </Box>

      <Flex direction="row" p={2} justify="end">
        <Text color="#0F1C33" fontSize="12px" fontWeight="normal" ml={2}>
          via TheCoinPerspective
        </Text>
      </Flex>
      <Divider className="" style={{ backgroundColor: "#0F1C33" }} />
    </>
  );
};

export default CoinPerspectiveSection;