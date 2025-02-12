"use client";

import { BodyLogoCreateYourNoFA } from "@/components/nyfa/svg-icons/logos/body-logo-create-your-nofa";
import { Text, Flex, Box, Button } from "@chakra-ui/react";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { coins } from "../../data/coins";
import { useState } from "react";
import { supabase } from "@/config/supabase";
import { useNoFAStore } from "@/stores/nofa";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/providers/supabase-provider";
import { Toaster, toaster } from "@/components/chakra/ui/toaster";
import { Spinner } from "@heroui/spinner";
import { CreateNoFAProps, Headline, NoFA } from "@/types/nofa";

export default function CreateYourNoFA() {
  const [coinId, setCoinId] = useState<string>("ethereum");
  const { user } = useSupabase();
  const router = useRouter();

  const [coinTicker, setCoinTicker] = useState<string>("ETH");

  const [isCreatingNoFA, setIsCreatingNoFA] = useState(false);

  const { setNoFAFromData } = useNoFAStore();

  const createNoFAFn = async (coinId: string) => {
    setIsCreatingNoFA(true);
    try {
      // 1. Get Coin Gecko Data
      const coinGeckoData = await (
        await fetch(`/api/coinGecko/${coinId}`)
      ).json();

      // 2. Get Crypto News API Data
      const cryptoNewsAPIData = await (
        await fetch(`/api/cryptoNewsAPI/${coinTicker}`)
      ).json();

      const headlines: Headline[] = cryptoNewsAPIData;

      // 3. Update store
      setNoFAFromData({
        coinId: coinGeckoData.coinId,
        creatorAuthId: user?.id,
        coinImageURI: coinGeckoData.coinImageURI,
        marketCap: coinGeckoData.marketCap,
        totalSupply: coinGeckoData.totalSupply,
        circulatingSupply: coinGeckoData.circulatingSupply,
        headlines,
      });

      // 4. Add NoFA to database
      const createdNoFA = await _insertNoFAInto({
        coinId: coinGeckoData.coinId,
        creatorAuthId: user?.id,
        coinImageURI: coinGeckoData.coinImageURI,
        marketCap: coinGeckoData.marketCap,
        totalSupply: coinGeckoData.totalSupply,
        circulatingSupply: coinGeckoData.circulatingSupply,
        headlines,
      });

      setNoFAFromData(createdNoFA);

      toaster.create({
        description: "NoFA successfully created.",
        duration: 3000,
        type: "success",
      });

      router.push(`/particular-nofa/${createdNoFA.id}`);
    } catch (error) {
      toaster.create({
        description: "NoFA creation failed.",
        duration: 3000,
        type: "error",
      });
      console.error("Error:", error);
    } finally {
      setIsCreatingNoFA(false);
    }
  };

  const _insertNoFAInto = async (props: CreateNoFAProps): Promise<NoFA> => {
    const {
      coinId,
      creatorAuthId,
      txnHash = null,
      ipfsURI = null,
      coinImageURI = null,
      marketCap = null,
      totalSupply = null,
      circulatingSupply = null,
      headlines = null,
      storageURI = null
    } = props;

    const { data, error } = await supabase
      .from("NOFAS")
      .insert({
        coinId,
        creatorAuthId,
        txnHash,
        ipfsURI,
        coinImageURI,
        marketCap,
        totalSupply,
        circulatingSupply,
        headlines,
        storageURI
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating NoFA:", error);
      throw error;
    }

    if (!data) {
      throw new Error("No data returned from insert");
    }

    // Parse the returned data to match the NoFA interface
    const parsedNoFA: NoFA = {
      id: data.id,
      coinId: data.coinId,
      creatorAuthId: data.creatorAuthId || null,
      txnHash: data.txnHash || null,
      ipfsURI: data.URI || null,
      coinImageURI: data.coinImageURI || null,
      marketCap: data.marketCap || null,
      totalSupply: data.totalSupply || null,
      circulatingSupply: data.circulatingSupply || null,
      timeCreated: data.timeCreated || null,
      headlines: data.headlines
        ? data.headlines.map((headline: any) => ({
            title: headline.title || null,
            imageURL: headline.imageURL || null,
            link: headline.link || null,
            sentiment: headline.sentiment || null,
          }))
        : null,
      storageURI: data.storageURI || null,
    };

    return parsedNoFA;
  };

  return (
    <>
      <Toaster />
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
          disabled={isCreatingNoFA}
          onClick={() => createNoFAFn(coinId)}
        >
          {isCreatingNoFA ? (
            <Spinner size="sm" />
          ) : (
            <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"}>
              Create
            </Text>
          )}
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
