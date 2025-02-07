"use client";

import { Box } from "@chakra-ui/react";

interface CoinPerspectiveProps {
  coinId?: string | null;
  vs?: string;
  fx?: string;
  theme?: "auto" | "light" | "dark";
}

export default function PriceWithChart({
  coinId = "ethereum",
  vs = "bitcoin",
  fx = "USD",
  theme = "auto",
}: CoinPerspectiveProps) {
  const iframeUrl = `https://thecoinperspective.com/widgets/coin?c=${coinId ?? "ethereum"}&vs=${vs}&fx=${fx}&stats=false&theme=${theme}`;

  return (
    <Box
      w="full"
      position="relative"
      pt="56.25%" // This creates a 16:9 aspect ratio (9/16 = 0.5625)
      // borderRadius="15px"
      overflow="hidden"
      bg="#0F1C33"
    >
      <iframe
        src={iframeUrl}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
}