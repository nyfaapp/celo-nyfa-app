"use client";

import { BodyLogoFirstPage } from "@/components/nyfa/svg-icons/logos/body-logo-first-page";
import { BodyLogoNotConnected } from "@/components/nyfa/svg-icons/logos/body-logo-not-connected";
import { useNoFAStore } from "@/stores/nofa";
import { Button, Text, Flex, Box } from "@chakra-ui/react";
import { Spinner } from "@heroui/spinner";
import { useAccount } from "wagmi";
// import html2canvas from "html2canvas";
// import { useRef } from "react";

export default function YourParticularNoFA() {
  const { nofa } = useNoFAStore();

  //   const flexRef = useRef(null);

  //   const downloadAsPNG = async () => {
  //     if (flexRef.current) {
  //       const standardWidth = 450; // Set standard width
  //       const standardHeight = 900; // Set standard height
  //       const scale = 2; // Fixed scale instead of device-dependent

  //       const canvas = await html2canvas(flexRef.current, {
  //         scale: scale,
  //         useCORS: true,
  //         allowTaint: true,
  //         logging: false,
  //         backgroundColor: "#FFFFFF",
  //         imageTimeout: 0,
  //         width: standardWidth,
  //         height: standardHeight,
  //       });

  //       const image = canvas.toDataURL("image/png", 1.0);

  //       const finalCanvas = document.createElement("canvas");
  //       const ctx = finalCanvas.getContext("2d");
  //       // Set final canvas to our standard size
  //       finalCanvas.width = standardWidth * scale;
  //       finalCanvas.height = standardHeight * scale;

  //       if (ctx) {
  //         ctx.fillStyle = "#FFFFFF";
  //         ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
  //         ctx.imageSmoothingEnabled = true;
  //         ctx.imageSmoothingQuality = "high";
  //         ctx.drawImage(canvas, 0, 0);
  //       }

  //       const finalImage = finalCanvas.toDataURL("image/png", 1.0);

  //       const link = document.createElement("a");
  //       const date = new Date();
  //       link.download = `${date.getTime()}.png`;
  //       link.href = finalImage;
  //       link.click();
  //     }
  //   };

  return (
    <>
      <Flex
        // ref={flexRef}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        h={"75vh"}
      >
        <Button bgColor={"#FDBB23"} borderRadius={15} mt={12} px={16} w={"3/6"}>
          <Spinner size="sm" color="default" />
        </Button>
      </Flex>
    </>
  );
}
