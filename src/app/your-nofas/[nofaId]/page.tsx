"use client";

import ETHPriceComparison from "@/components/nyfa/coin-perspective/eth-price-comparison";
import PriceWithChart from "@/components/nyfa/coin-perspective/price-with-chart";
import { DownloadIcon } from "@/components/nyfa/svg-icons/download-icon";
import { LatestHeadlinesIcon } from "@/components/nyfa/svg-icons/latest-headlines-icon";
import { LoveIcon } from "@/components/nyfa/svg-icons/love-icon";
import { SmileyIcon } from "@/components/nyfa/svg-icons/smiley-icon";
import { StarIcon } from "@/components/nyfa/svg-icons/star-icon";
import { TokenomicsIcon } from "@/components/nyfa/svg-icons/tokenomics-icon";
import { useNoFAStore } from "@/stores/nofa";
import { getColorForHeadline, getColorForNoFA } from "@/utils/colorForNoFa";
import { Button, Text, Flex, Box, Image } from "@chakra-ui/react";
import { Divider } from "@heroui/divider";

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
        justifyContent={"start"}
        alignItems={"left"}
        flexDirection={"column"}
        minH="100vh"
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
          borderColor={"#0F1C33"}
          borderWidth={"1px"}
          direction={"column"}
          p={2}
          mb={8}
        >
          <Flex direction={"row"} justifyContent={"space-between"}>
            <Image
              rounded="md"
              src={nofa?.coinImageURI ?? undefined}
              alt="Coin"
              width={"50px"}
              color={"#0F1C33"}
              fontSize={"10px"}
            />

            <Text color={"#EA5D5D"} fontSize={"22px"} fontWeight={"bold"}>
              {nofa?.id?.substring(0, 3) ?? null} {nofa?.coinId ?? null}
            </Text>
          </Flex>

          <Divider className="" style={{ backgroundColor: "#0F1C33" }} />

          <Flex direction={"row"} mt={2} p={2}>
            <StarIcon />

            <Text
              color={"#0F1C33"}
              fontSize={"16px"}
              fontWeight={"bold"}
              ml={2}
            >
              Token price and chart
            </Text>
          </Flex>

          <Box py={2}>
            <PriceWithChart coinId={nofa?.coinId ?? null} />
          </Box>

          <Flex direction={"row"} mt={2} p={2}>
            <SmileyIcon />

            <Text
              color={"#0F1C33"}
              fontSize={"16px"}
              fontWeight={"bold"}
              ml={2}
            >
              What if your crypto was like ETH?
            </Text>
          </Flex>

          <Box py={2}>
            <ETHPriceComparison vs={nofa?.coinId ?? null} />
          </Box>

          <Flex direction={"row"} p={2} justify={"end"}>
            {/* <SmileyIcon /> */}

            <Text
              color={"#0F1C33"}
              fontSize={"12px"}
              fontWeight={"normal"}
              ml={2}
            >
              via TheCoinPerspective
            </Text>
          </Flex>
          <Divider className="" style={{ backgroundColor: "#0F1C33" }} />

          <Flex direction={"row"} mt={2} p={2}>
            <TokenomicsIcon />

            <Text
              color={"#0F1C33"}
              fontSize={"16px"}
              fontWeight={"bold"}
              ml={2}
            >
              Tokenomics
            </Text>
          </Flex>

          <Flex direction={"row"} p={2} justify={"space-between"}>
            <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"}>
              Market cap
            </Text>

            <Text
              color={"#0F1C33"}
              fontSize={"16px"}
              fontWeight={"bold"}
              ml={2}
            >
              USD {nofa?.marketCap?.toLocaleString()}
            </Text>
          </Flex>
          <Flex direction={"row"} mt={2} p={2} justify={"space-between"}>
            <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"}>
              Total supply
            </Text>

            <Text
              color={"#0F1C33"}
              fontSize={"16px"}
              fontWeight={"bold"}
              ml={2}
            >
              USD {nofa?.totalSupply?.toLocaleString()}
            </Text>
          </Flex>
          <Flex direction={"row"} mt={2} p={2} justify={"space-between"}>
            <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"}>
              Circulating supply
            </Text>

            <Text
              color={"#0F1C33"}
              fontSize={"16px"}
              fontWeight={"bold"}
              ml={2}
            >
              {nofa?.circulatingSupply?.toLocaleString()}
            </Text>
          </Flex>
          <Divider className="" style={{ backgroundColor: "#0F1C33" }} />

          <Flex direction={"row"} mt={2} p={2}>
            <LatestHeadlinesIcon />

            <Text
              color={"#0F1C33"}
              fontSize={"16px"}
              fontWeight={"bold"}
              ml={2}
            >
              Latest Headlines
            </Text>
          </Flex>

          {nofa?.headlines?.map((headline, index) => (
            <Flex
              key={index}
              direction={"row"}
              mt={2}
              mb={1}
              p={4}
              bgColor={getColorForHeadline(headline)}
              h={"150px"}
              borderRadius={"10px"}
              justify={"center"}
            >
              <Image
                rounded="md"
                src={headline.imageURL ?? undefined}
                alt="Coin"
                width={"100px"}
                color={"#0F1C33"}
                fontSize={"10px"}
              />

              <Text
                color={"#0F1C33"}
                fontSize={"16px"}
                fontWeight={"normal"}
                ml={2}
                textAlign={"left"}
                alignSelf={"center"}
              >
                {headline.title ?? ""}
              </Text>
            </Flex>
          ))}

          <Flex direction={"row"} p={2} justify={"end"}>
            {/* <SmileyIcon /> */}

            <Text
              color={"#0F1C33"}
              fontSize={"12px"}
              fontWeight={"normal"}
              ml={2}
            >
              via CryptonewsAPI
            </Text>
          </Flex>

          <Divider className="" style={{ backgroundColor: "#0F1C33" }} />

          <Flex direction={"row"} p={2} justify={"center"} mt={2}>
            {/* <SmileyIcon /> */}

            <Text
              color={"#0F1C33"}
              fontSize={"12px"}
              fontWeight={"normal"}
              mr={2}
            >
              Made with
            </Text>
            <LoveIcon />

            <Text
              color={"#0F1C33"}
              fontSize={"12px"}
              fontWeight={"normal"}
              ml={2}
            >
              on the Nyfa App
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
