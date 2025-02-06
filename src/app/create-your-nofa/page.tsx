"use client";

import { BodyLogoCreateYourNoFA } from "@/components/svg-icons/logos/body-logo-create-your-nofa";
import { BodyLogoNotConnected } from "@/components/svg-icons/logos/body-logo-not-connected";
import { Text, Flex, Box, Button } from "@chakra-ui/react";
// import html2canvas from "html2canvas";
// import { useRef } from "react";

import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@heroui/autocomplete";
import { coins } from "../../../data/coins";
import { useState } from "react";
import PriceWithChart from "@/components/coin-perspective/price-with-chart";

export default function CreateYourNoFA() {
  const [coin, setCoin] = useState<string>("ethereum");

  return (
    <>
      <Flex
        justifyContent={"start"}
        alignItems={"center"}
        flexDirection={"column"}
        h={"75vh"}
      >
        <Text
          color={"#0F1C33"}
          fontSize={"24px"}
          fontWeight={"bold"}
          my={12}
          mx={8}
        >
          Create* your NoFA
        </Text>
        <BodyLogoCreateYourNoFA />

        <Text
          color={"#0F1C33"}
          fontSize={"14px"}
          fontWeight={"normal"}
          mt={8}
          mb={4}
        >
          Select and create
        </Text>

        <Autocomplete
          className="max-w-xs"
          label="Select a coin"
          defaultItems={coins}
          defaultSelectedKey="ethereum"
          isVirtualized
          onSelectionChange={(key) => {
            if (key) {
              console.log("Selected:", key);
              setCoin(key.toString());
            }
          }}
          isRequired
        >
          {coins.map((coin) => (
            <AutocompleteItem key={coin.id} textValue={coin.name}>
              {coin.name} ({coin.symbol.toUpperCase()})
            </AutocompleteItem>
          ))}
        </Autocomplete>

  
        <Button
          bgColor={"#FDBB23"}
          borderRadius={15}
          mt={8}
          w={"3/6"}

          onClick={()=>console.log(coin)}

        >
          <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"}>
            Create
          </Text>
        </Button>
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
