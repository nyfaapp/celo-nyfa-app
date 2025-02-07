"use client";

import { BodyLogoNotConnected } from "@/components/nyfa/svg-icons/logos/body-logo-not-connected";
import { useSupabase } from "@/providers/supabase-provider";
import { useNoFAStore } from "@/stores/nofa";
import { getColorForNoFA } from "@/utils/colorForNoFa";
import { Button, Text, Flex, Box, SimpleGrid } from "@chakra-ui/react";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function YourNoFas() {
  const router = useRouter();

  const { userNofas, fetchUserNoFAs, isLoading, setNoFAFromData } =
    useNoFAStore();

  const { user } = useSupabase();

  useEffect(() => {
    if (user && user.id) {
      fetchUserNoFAs(user.id);
    }
  }, []);

  return (
    <>
      <Flex
        justifyContent={"start"}
        alignItems={"center"}
        flexDirection={"column"}
        h={"100vh"} // Change to full viewport height
        pb="60px" // Add padding bottom to account for absolute box
        position="relative" // Add this to establish positioning context
      >
        <Box w="full" textAlign="center" pt={4} position={"static"} px={4}>
          <Text color={"#0F1C33"} fontSize={"24px"} fontWeight={"bold"}>
            Your NoFAs*, Created by You
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
                View all
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
                  onClick={async () => {
                    setNoFAFromData(nofa);
                    // Give a tiny delay to ensure state is updated
                    await new Promise((resolve) => setTimeout(resolve, 0));
                    router.push(`/your-nofas/${nofa.id}`);
                  }}
                >
                  <Text color="#0F1C33" m={4} textAlign={"center"}>
                    {nofa.id}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Flex>

      <Box
        bg="#0F1C33"
        position="fixed" // Change to fixed
        bottom="0"
        left="0" // Add this
        right="0"
        py={4}
        zIndex={2} // Ensure it stays on top
      >
        <Text
          color={"white"}
          fontSize={"14px"}
          fontWeight={"normal"}
          mx={16}
          textAlign={"center"}
        >
          *NoFAs are infographic NFTs generated using the click of a button.
        </Text>
      </Box>
    </>
  );
}
