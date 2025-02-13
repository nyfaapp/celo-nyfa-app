"use client";

import { Text, Flex, Image } from "@chakra-ui/react";
import { Divider } from "@heroui/divider";
import { LatestHeadlinesIcon } from "@/components/nyfa/svg-icons/latest-headlines-icon";
import { getColorForHeadline } from "@/utils/colorForNoFa";
import { Headline } from "@/types/nofa";

export interface HeadlinesSectionProps {
  headlines?: Headline[];
}

const HeadlinesSection: React.FC<HeadlinesSectionProps> = ({ headlines }) => {
  if (!headlines || headlines.length === 0) {
    return null;
  }

  return (
    <>
      <Flex direction="row" mt={2} p={2}>
        <LatestHeadlinesIcon />
        <Text color="#0F1C33" fontSize="16px" fontWeight="bold" ml={2}>
          Latest Headlines
        </Text>
      </Flex>

      {headlines.map((headline: Headline, index) => (
        <Flex
          key={index}
          direction="row"
          mt={2}
          mb={1}
          p={4}
          bgColor={getColorForHeadline(headline)}
          h="150px"
          borderRadius="10px"
          justify="center"
          onClick={() => {
            window.open(headline.link!, "_blank");
          }}
        >
          <Image
            rounded="md"
            src={headline.imageURL ?? ""}
            alt="Coin"
            width="120px"
            color="#0F1C33"
            fontSize="10px"
          />
          <Text
            color="#0F1C33"
            fontSize="16px"
            fontWeight="normal"
            ml={2}
            textAlign="left"
            alignSelf="center"
          >
            {headline.title}
          </Text>
        </Flex>
      ))}

      <Flex direction="row" p={2} justify="end">
        <Text color="#0F1C33" fontSize="12px" fontWeight="normal" ml={2}>
          via CryptonewsAPI
        </Text>
      </Flex>
      <Divider className="" style={{ backgroundColor: "#0F1C33" }} />
    </>
  );
};

export default HeadlinesSection;
