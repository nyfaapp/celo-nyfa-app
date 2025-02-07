"use client";

import { Box } from "@chakra-ui/react";

interface ETHPriceComparisonProps {
  vs?: string | null;
  fx?: string;
  theme?: "auto" | "light" | "dark";
  controls?: boolean;
  maxWidth?: string | number;
  height?: string | number;
}

export default function ETHPriceComparison({
  vs = "bitcoin",
  fx = "USD",
  theme = "auto",
  controls = false,
  maxWidth = "full",
  height = "305px",
}: ETHPriceComparisonProps) {
  const iframeUrl = `https://thecoinperspective.com/widgets/comparison?c=${vs}&vs=ethereum&fx=${fx}&controls=${controls}&allowCoinSelect=false&theme=${theme}`;

  return (
    <Box 
      w="full" 
      maxW={maxWidth}
      position="relative" 
      overflow="hidden" 
      bg="#0F1C33" 
      h={height}
      data-testid="eth-price-comparison"
    >
      <iframe
        src={iframeUrl}
        style={{
          border: "none",
          padding: "3px",
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
}