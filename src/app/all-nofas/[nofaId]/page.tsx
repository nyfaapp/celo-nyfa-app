"use client";

import PriceWithChart from "@/components/nyfa/coin-perspective/price-with-chart";
import { DownloadIcon } from "@/components/nyfa/svg-icons/download-icons";
import { useNoFAStore } from "@/stores/nofa";
import { Button, Text, Flex, Box, Image } from "@chakra-ui/react";
import { Divider } from "@heroui/divider";

// import html2canvas from "html2canvas";
// import { useRef } from "react";

export default function ParticularNoFA() {
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
        justifyContent={"start"}
        alignItems={"left"}
        flexDirection={"column"}
        h={"75vh"}
        px={4}
      >
        <Box w="full" textAlign="center" pt={4} position={"static"} mb={4}>
          <Flex direction={"row"} justifyContent={"space-between"}>
            <Text color={"#0F1C33"} fontSize={"22px"} fontWeight={"bold"}>
              Your NoFA
            </Text>

            <Button
              bgColor={"#FDBB23"}
              borderRadius={15}
              w={"2/6"}
              // onClick={() => router.push("/create-your-nofa")}
            >
              <>
                <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"medium"}>
                  Download
                </Text>
                <DownloadIcon />
              </>
            </Button>
          </Flex>
        </Box>

        {/* <Button bgColor={"#FDBB23"} borderRadius={15} mt={12} px={16} w={"3/6"}>
          <Spinner size="sm"/>
        </Button> */}

        <Flex
          bgColor={"#E2E8F0"}
          borderRadius={"10px"}
          direction={"column"}
          p={2}
        >
          <Flex direction={"row"} justifyContent={"space-between"}>
            <Image
              rounded="md"
              src={nofa?.coinImageURI ?? undefined}
              alt="Coin image"
              width={"50px"}
            />

            <Text color={"#EA5D5D"} fontSize={"22px"} fontWeight={"bold"}>
              {nofa?.id?.substring(0, 3) ?? null} {nofa?.coinId ?? null}
            </Text>

            {/* <Button
              bgColor={"#FDBB23"}
              borderRadius={15}
              w={"2/6"}
              // onClick={() => router.push("/create-your-nofa")}
            >
              <>
                <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"medium"}>
                  Download
                </Text>
                <DownloadIcon />
              </>
            </Button> */}
          </Flex>

          <Divider className="" style={{ backgroundColor: "#0F1C33" }} />

          <PriceWithChart coinId={nofa?.coinId ?? null} />
        </Flex>
      </Flex>
    </>
  );
}
