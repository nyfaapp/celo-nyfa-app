"use client";

import { useSupabase } from "@/providers/supabase-provider";
import { useNoFAStore } from "@/stores/nofa";
import { getColorForNoFA } from "@/utils/colorForNoFa";
import { Button, Text, Flex, Box, SimpleGrid, Link } from "@chakra-ui/react";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AllNoFAs() {
  const router = useRouter();
  const { allNofas, isLoadingAll, fetchAllOtherNoFAs, setNoFAFromData } =
    useNoFAStore();

  const { user } = useSupabase();

  useEffect(() => {
    if (user) {
      if (user.id) {
        fetchAllOtherNoFAs(user.id);
      }
    }
  }, [user]);

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
            All Other NoFAs*
          </Text>

          <Flex direction={"row"} justify={"space-between"} px={4}>
            <Button
              bgColor={"#EA5D5D"}
              borderRadius={15}
              mt={4}
              w={"2/6"}
              onClick={() => router.push("/your-nofas")}
            >
              <Text color={"white"} fontSize={"14px"} fontWeight={"normal"}>
                View yours
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
          {isLoadingAll ? (
            <Flex justifyContent="center" alignItems="center" h="full">
              <Spinner size="sm" />
            </Flex>
          ) : allNofas.length === 0 ? (
            <Text color="#0F1C33" fontSize="18px" textAlign="center" mt={8}>
              you have not created any NoFAs ... yet
            </Text>
          ) : (
            <SimpleGrid columns={2} px={8} w="full" gap={6} py={4}>
              {allNofas.map((nofa, index) => (
                <Link href={`/your-nofas/${nofa.id}`} key={index}>
                  <Box
                    bg={getColorForNoFA(nofa.headlines)}
                    height={"150px"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={"15px"}
                    w={"full"}
                    onClick={() => setNoFAFromData(nofa)}
                  >
                    <Text color="#0F1C33" m={4} textAlign={"center"}>
                      {nofa.id}
                    </Text>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Flex>

      <Box
        bg="#0F1C33"
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        py={4}
        zIndex={2}
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
