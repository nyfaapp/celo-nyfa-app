"use client";

import { BodyLogoNotConnected } from "@/components/ui/svg-icons/logos/body-logo-not-connected";
import { Button, Text, Flex, Box, HStack, SimpleGrid } from "@chakra-ui/react";
import { Divider } from "@heroui/divider";

export default function AllNoFAs() {
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
          <Text color={"#0F1C33"} fontSize={"24px"} fontWeight={"bold"} >
            All NoFAs*, Minted by Creators
          </Text>

          <Button
            bgColor={"#FDBB23"}
            borderRadius={15}
            mt={4}
            w={"3/6"}
          >
            <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"} >
              Create yours
            </Text>
          </Button>

          <Divider
            className="my-4 px-8"
            style={{ backgroundColor: "#0F1C33"}}
          />
        </Box>


        <Box
          flex={1} // This will make it take remaining space
          overflowY="auto"
          w="full"
          mb={4} // Add margin bottom for spacing
        >
          <SimpleGrid columns={2} px={8} w="full" gap={6} py={4}>
            {Array.from({ length: 15 }).map((_, index) => (
              <Box
                key={index}
                bg="gray.100"
                height="200px"
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border={"15px"}
              >
                <Text color="#0F1C33">NoFA #{index + 1}</Text>
              </Box>
            ))}
          </SimpleGrid>
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
