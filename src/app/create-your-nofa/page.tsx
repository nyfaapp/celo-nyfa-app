"use client";

import { BodyLogoCreateYourNoFA } from "@/components/ui/svg-icons/logos/body-logo-create-your-nofa";
import { BodyLogoNotConnected } from "@/components/ui/svg-icons/logos/body-logo-not-connected";
import { Button, Text, Flex, Box } from "@chakra-ui/react";
// import html2canvas from "html2canvas";
// import { useRef } from "react";

export default function CreateYourNoFA() {
  return (
    <>
      <Flex
        // ref={flexRef}
        justifyContent={"start"}
        alignItems={"center"}
        flexDirection={"column"}
        h={"75vh"}
      >
        <Text color={"#0F1C33"} fontSize={"24px"} fontWeight={"bold"} my={8}>
          Create* your NoFA
        </Text>
        <BodyLogoCreateYourNoFA />

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
        <Text
          color={"white"}
          fontSize={"14px"}
          fontWeight={"normal"}
          mx={16}
          textAlign={"center"}
        >
          If you *create, you will be redirected to a downloadable infographic.
        </Text>
      </Box>
    </>
  );
}
