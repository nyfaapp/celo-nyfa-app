"use client";

import { Text, Flex, Button, Box } from "@chakra-ui/react";
import { DownloadIcon } from "@/components/nyfa/svg-icons/download-icon";
import { Spinner } from "@heroui/spinner";

interface NoFAHeaderProps {
  onDownload: () => Promise<void>;
  isDownloading: boolean;
}

const NoFAHeader: React.FC<NoFAHeaderProps> = ({
  onDownload,
  isDownloading,
}) => {
  return (
    <Box w="full" textAlign="center" pt={4} position="static" mb={4}>
      <Flex direction="row" justifyContent="space-between">
        <Text color="#0F1C33" fontSize="22px" fontWeight="bold">
          Your NoFA
        </Text>

        <Button
          bgColor="#FDBB23"
          borderRadius={15}
          w="2/6"
          onClick={onDownload}
          disabled={isDownloading}
        >
          <Text color="#0F1C33" fontSize="14px" fontWeight="medium">
            Download
          </Text>

          {isDownloading ? <Spinner size="sm" />  :  <DownloadIcon />}
        </Button>
      </Flex>
    </Box>
  );
};

export default NoFAHeader;
