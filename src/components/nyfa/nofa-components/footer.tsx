"use client";

import { Text, Flex } from "@chakra-ui/react";
import { LoveIcon } from "@/components/nyfa/svg-icons/love-icon";

interface FooterProps {
  timeCreated: string | null | undefined; // Will work directly with the timestamp from Supabase
}

const Footer: React.FC<FooterProps> = ({ timeCreated }) => {
  return (
    <Flex
      direction="column"
      p={2}
      justify="center"
      mt={2}
      className="nyfa-footer"
    >
      <Flex
        direction="row"
        p={2}
        justify="center"
        mt={2}
        className="nyfa-footer"
      >
        <Text color="#0F1C33" fontSize="12px" fontWeight="normal" mr={2}>
          Made with
        </Text>
        <LoveIcon />
        <Text color="#0F1C33" fontSize="12px" fontWeight="normal" ml={2}>
          on the Nyfa App
        </Text>
      </Flex>
      <Text
        color="#EA5D5D"
        fontSize="12px"
        fontWeight="normal"
        textAlign={"center"}
        mb={2}
      >
        {timeCreated}
      </Text>
    </Flex>
  );
};

export default Footer;
