"use client";

import { useNoFAStore } from "@/stores/nofa";
import { getColorForNoFA } from "@/utils/colorForNoFa";
import {
  Button,
  Text,
  Flex,
  Box,
  HStack,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AllNoFAs() {
  const router = useRouter();
  const { allNofas, isLoadingAll, fetchAllNoFAs } = useNoFAStore();

  useEffect(() => {
    fetchAllNoFAs();
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
            All NoFAs*, Minted by Creators
          </Text>

          <Button
            bgColor={"#FDBB23"}
            borderRadius={15}
            mt={4}
            w={"3/6"}
            onClick={() => router.push("/create-your-nofa")}
          >
            <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"}>
              Create yours
            </Text>
          </Button>

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
              No NoFAs have been created yet
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
                  >
                    <Text color="#0F1C33" m={4} textAlign={"center"}>{nofa.id}</Text>
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
