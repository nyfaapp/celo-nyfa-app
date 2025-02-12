"use client";

import { Text, Flex, Image } from "@chakra-ui/react";
import { Divider } from "@heroui/divider";

interface CoinInfoProps {
  coinImageURI?: string | undefined;
  id?: string  | undefined;
  coinId?: string  | undefined;
}

const CoinInfo: React.FC<CoinInfoProps> = ({ coinImageURI, id, coinId }) => {
  return (
    <>
      <Flex direction="row" justifyContent="space-between" my={2}>
        <Image
          rounded="md"
          src={coinImageURI}
          alt="Coin"
          width="50px"
          color="#0F1C33"
          fontSize="10px"
        />

        <Text color="#EA5D5D" fontSize="22px" fontWeight="bold">
          {id?.substring(0, 3)}{"-"}{coinId?.substring(0, 3)}
        </Text>
      </Flex>
      <Divider className="" style={{ backgroundColor: "#0F1C33" }} />
    </>
  );
};

export default CoinInfo;