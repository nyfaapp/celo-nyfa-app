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
}: ETHPriceComparisonProps) {
  const iframeUrl = `https://thecoinperspective.com/widgets/comparison?c=ethereum&vs=${vs}&fx=${fx}&controls=false&allowCoinSelect=false&theme=auto`;

  return (
    <Box w="full" position="relative" overflow="hidden" bg="#0F1C33" h={"305px"}>
      <iframe
        onLoad={(e) => {
          const iframe = e.target as HTMLIFrameElement;
          if (iframe.contentWindow?.document.body) {
            iframe.style.height =
              iframe.contentWindow.document.body.scrollHeight + 20 + "px";
          }
        }}
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
