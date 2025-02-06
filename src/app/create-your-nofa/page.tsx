"use client";

import { BodyLogoCreateYourNoFA } from "@/components/nyfa/svg-icons/logos/body-logo-create-your-nofa";
import { Text, Flex, Box, Button } from "@chakra-ui/react";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { coins } from "../../data/coins";
import { useState } from "react";
import { supabase } from "@/config/supabase";
import { useNoFAStore } from "@/stores/nofa";
import { useRouter } from "next/navigation";

export default function CreateYourNoFA() {
  const [coinId, setCoinId] = useState<string>("ethereum");

  const [coinTicker, setCoinTicker] = useState<string>("ETH");

  const setNoFAData = useNoFAStore((state) => state.setNoFA);
  const router = useRouter();
  const nofa = useNoFAStore((state) => state.nofa);

  const createNoFAFn = async (coinId: string) => {
    try {
      // 1. Get Coin Gecko Data
      const coinGeckoData = await (
        await fetch(`/api/coinGecko/${coinId}`)
      ).json();

      console.log(coinGeckoData);

      // 2. Get Crypto News API Data

      const cryptoNewsAPIData = await (
        await fetch(`/api/cryptoNewsAPI/${coinTicker}`)
      ).json();

      const headlines: Headline[] = cryptoNewsAPIData.map((item: NewsItem) => ({
        title: item.title || null,
        imageURL: item.image_url || null,
        link: item.news_url || null,
        sentiment: item.sentiment || null,
      }));

      console.log(headlines);

      // Set data to store
      setNoFAData({
        coinId: coinGeckoData.coinId,
        coinImageURI: coinGeckoData.coinImageURI,
        marketCap: coinGeckoData.marketCap,
        totalSupply: coinGeckoData.totalSupply,
        circulatingSupply: coinGeckoData.circulatingSupply,
        headlines,
      });

      //

      // Navigate to next page
      // router.push('/create-your-nofa/details');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createNoFA = async (props: CreateNoFAProps) => {
    const {
      coinId,
      creatorAuthId,
      txnHash = null,
      URI = null,
      coinImageURI = null,
      marketCap = null,
      totalSupply = null,
      circulatingSupply = null,
      headlines = null,
    } = props;

    const { data, error } = await supabase
      .from("NOFAS")
      .insert({
        coinId,
        creatorAuthId,
        txnHash,
        URI,
        coinImageURI,
        marketCap,
        totalSupply,
        circulatingSupply,
        headlines,
      })
      .select();

    if (error) {
      console.error("Error creating NoFA:", error);
      throw error;
    }

    return data;
  };

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
              const selectedCoin = coins.find((coin) => coin.id === key);
              if (selectedCoin) {
                console.log("Selected:", key);
                setCoinId(key.toString());
                setCoinTicker(selectedCoin.symbol.toUpperCase());
              }
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
          onClick={async () => {
            console.log(coinId);
            console.log(coinTicker);

            createNoFAFn(coinId);
            // Example usage
            // const response = await fetch(`/api/coinGecko/${coinId}`);
            // const data = await response.json();

            // data will have: coinId, coinImageURI, marketCap, totalSupply, circulatingSupply
          }}
        >
          <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"}>
            Create
          </Text>
        </Button>

        {/* <Text
          color={"#0F1C33"}
          fontSize={"14px"}
          fontWeight={"normal"}
          mt={8}
          mb={4}
        >
          {nofa?.coinImageURI ?? "NoFA [coinImageURI] not set."}
        </Text> */}
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
