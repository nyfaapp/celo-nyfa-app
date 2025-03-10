"use client";

import { NFTIcon } from "@/components/nyfa/svg-icons/nft-icon";
import { useSupabase } from "@/providers/supabase-provider";
import { useCreatorStore } from "@/stores/creator";
import { useNoFAStore } from "@/stores/nofa";
import { getColorForNoFA } from "@/utils/colorForNoFa";
import { Button, Text, Flex, Box, SimpleGrid, Image } from "@chakra-ui/react";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";
import mixpanel from "mixpanel-browser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function YourNoFas() {
  const router = useRouter();

  const { userNofas, fetchUserNoFAs, isLoading, setNoFAFromData } =
    useNoFAStore();

  const { user, supabase } = useSupabase();
  const creator = useCreatorStore((state) => state.creator);
  
  useEffect(() => {
    if (user && user.id) {
      fetchUserNoFAs(supabase, user.id);
    }
  }, []);

  return (
    <>
      <Flex
        justifyContent={"start"}
        alignItems={"center"}
        flexDirection={"column"}
        h={"100vh"} 
        pb="60px" 
        position="relative" 
      >
        <Box w="full" textAlign="center" pt={4} position={"static"} px={4}>
          <Text color={"#0F1C33"} fontSize={"24px"} fontWeight={"bold"}>
            Your NoFAs*
          </Text>

          <Flex direction={"row"} justify={"space-between"} px={4}>
            <Button
              bgColor={"#EA5D5D"}
              borderRadius={15}
              mt={4}
              w={"2/6"}
              onClick={() => router.push("/all-nofas")}
            >
              <Text color={"white"} fontSize={"14px"} fontWeight={"normal"}>
                View others
              </Text>
            </Button>

            <Button
              bgColor={"#A9CEEB"}
              borderRadius={15}
              mt={4}
              w={"2/6"}
              onClick={() => router.push("/create-your-nofa")}
            >
              <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"}>
                Create yours
              </Text>
            </Button>
          </Flex>

          <Divider
            className="my-4 px-8"
            style={{ backgroundColor: "#0F1C33" }}
          />
        </Box>
        <Box flex={1} overflowY="auto" w="full" mb={4}>
          {isLoading ? (
            <Flex justifyContent="center" alignItems="center" h="full">
              <Spinner size="sm" />
            </Flex>
          ) : userNofas.length === 0 ? (
            <Text color="#0F1C33" fontSize="18px" textAlign="center" mt={8}>
              you have not created any NoFAs ... yet
            </Text>
          ) : (
            <SimpleGrid columns={2} px={8} w="full" gap={6} py={4}>
              {userNofas.map((nofa, index) => (
                <Box
                  bg={getColorForNoFA(nofa.headlines)}
                  height={"150px"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius={"15px"}
                  w={"full"}
                  key={index}
                  flexDir={"column"}
                  alignContent={"center"}
                  onClick={async () => {
                    setNoFAFromData(nofa);
                    // Give a tiny delay to ensure state is updated
                    await new Promise((resolve) => setTimeout(resolve, 0));
                    const { id: nofaId, ...nofaWithoutId } = nofa;
                    const { id: creatorId, ...creatorWithoutId } = creator || {};

                    mixpanel.track('Particular Your NoFA clicked', {
                      nofaId: nofaId,
                      creatorId: creatorId,
                      ...nofaWithoutId,
                      ...creator
                    });
                    router.push(`/particular-nofa/${nofa.id}`);
                  }}
                >
                  <>
                    {nofa.txnHash ? <NFTIcon /> : null}
                    <Text color="#0F1C33" m={4} textAlign={"center"}>
                      {nofa.id?.substring(0, 8)}
                    </Text>
                    <Image
                      rounded="md"
                      src={nofa.coinImageURI!}
                      alt="Coin"
                      width="30px"
                      color="#0F1C33"
                      fontSize="10px"
                    />
                  </>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Flex>

      <Box
        bg="#0F1C33"
        position="fixed"
        bottom="0"
        left={["0", "0", "50%"]} // Mobile first, desktop centered
        width={["100%", "100%", "100%"]}
        maxWidth={["100%", "100%", "480px"]} // Match your container's max width
        transform={["none", "none", "translateX(-50%)"]}
        py={4}
        zIndex={2}// Ensure it stays on top
      >
        <Text
          color={"white"}
          fontSize={"14px"}
          fontWeight={"normal"}
          mx={16}
          textAlign={"center"}
        >
          *NoFAs are infographic NFTs generated using the click of a button by
          Nyla, our version of AI
        </Text>
      </Box>
    </>
  );
}
