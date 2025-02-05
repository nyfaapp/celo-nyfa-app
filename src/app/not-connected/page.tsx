"use client";

import { BodyLogoNotConnected } from "@/components/svg-icons/logos/body-logo-not-connected";
import { Button, Text, Flex, Box } from "@chakra-ui/react";
// import html2canvas from "html2canvas";
// import { useRef } from "react";

export default function NotConnected() {
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
        <BodyLogoNotConnected />
        <Text color={"#0F1C33"} fontSize={"40px"} fontWeight={"bold"} mt={8}>
          not connected*
        </Text>

        <Button bgColor={"#FDBB23"} borderRadius={15} mt={12} px={16} w={"3/6"}>
          <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"}>
            Connect
          </Text>
        </Button>

        {/* <Button bgColor={"#FDBB23"} borderRadius={15} mt={12} px={16} w={"3/6"}>
          <Spinner size="sm" color="default" />
        </Button> */}
      </Flex>

      <Box bg="#0F1C33" position="absolute" bottom="0" right="0" py={4}>
        <Text color={"white"} fontSize={"14px"} fontWeight={"normal"} mx={16} textAlign={"center"}>
          If you are *connected, you will be able to create a NoFA
        </Text>
      </Box>
    </>
  );
}
