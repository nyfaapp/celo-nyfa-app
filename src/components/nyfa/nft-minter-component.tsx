"use client";
import { useState } from "react";
import { VStack, Text, Box, Button } from "@chakra-ui/react";
import { Spinner } from "@heroui/spinner";
import { motion } from "framer-motion";
import { LoveIcon } from "./svg-icons/love-icon";
import { useSupabase } from "@/providers/supabase-provider";
import { NoFA } from "@/types/nofa";
import { useNoFAStore } from "@/stores/nofa";
import { Toaster, toaster } from "@/components/chakra/ui/toaster";
import {
  createPublicClient,
  http,
  createWalletClient,
  custom,
  getAddress,
  Address,
} from "viem";
import { celoAlfajores } from "viem/chains";
import { useAccount } from "wagmi";
import mixpanel from "mixpanel-browser";

const MotionBox = motion(Box);

interface MinterProps {
  ipfsURI: string;
  nofaId: string;
  nofaTxnHash: string;
}

export default function NFTMinterComponent({
  ipfsURI,
  nofaId,
  nofaTxnHash,
}: MinterProps) {
  if (nofaTxnHash) {
    return null;
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const { address } = useAccount();

  const { supabase } = useSupabase();
  const { setNoFAFromData } = useNoFAStore();

  const updateNofaInSupabase = async (mintTxHash: string) => {
    try {
      const { data, error } = await supabase
        .from("NOFAS")
        .update({ txnHash: mintTxHash })
        .eq("id", nofaId)
        .select()
        .single();

      if (error) {
        console.error("Error updating NoFA:", error);
        throw error;
      }

      if (!data) {
        throw new Error("No data returned from update");
      }

      const parsedNoFA: NoFA = {
        id: data.id,
        coinId: data.coinId,
        creatorAuthId: data.creatorAuthId || null,
        txnHash: data.txnHash || null,
        ipfsURI: data.ipfsURI || null,
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

      setNoFAFromData(parsedNoFA);
    } catch (err) {
      console.error("Error updating NoFA:", err);
      throw err;
    }
  };

  const mintNFT = async () => {
    if (!ipfsURI) {
      setError("Please create and upload the NoFA to IPFS first");
      return;
    }

    if (!address) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const publicClient = createPublicClient({
        chain: celoAlfajores,
        transport: http(),
      });

      const walletClient = createWalletClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });

      const { abi, address: nftContractAddress } = await import(
        "@/constants/nofaNFTContract"
      );

      const { request } = await publicClient.simulateContract({
        address: nftContractAddress,
        abi,
        functionName: "mint",
        args: [address, ipfsURI],
      });

      const hash = await walletClient.writeContract({
        ...request,
        account: address as Address,
      });
      setTxHash(hash);

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      if (receipt.status === "success") {
        await updateNofaInSupabase(hash);
        toaster.create({
          description: "NFT minted successfully!",
          duration: 3000,
          type: "success",
        });
        mixpanel.track("Particular NoFA NFT minted", {
          nofaId,
        });
      } else {
        throw new Error("Transaction failed");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while minting"
      );
      toaster.create({
        description: "Failed to mint NFT. Please try again.",
        duration: 3000,
        type: "error",
      });
      mixpanel.track("Particular NoFA mint attempt failed", {
        nofaId,
        error: err instanceof Error ? err.message : null,
      });
    } finally {
      setLoading(false);
    }
  };

  const LoadingStatus = () => (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      p={4}
      borderRadius="15px"
      bg="#0F1C33"
      mb={4}
    >
      <Text color="white" fontSize="sm">
        Minting your NFT
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ...
        </motion.span>
      </Text>
    </MotionBox>
  );

  return (
    <VStack align="stretch" w="full">
      <Toaster />
      <Button
        bgColor="#A9CEEB"
        borderRadius={15}
        w="full"
        onClick={mintNFT}
        disabled={loading || !ipfsURI}
        mb={4}
        alignSelf="center"
      >
        {loading ? (
          <Spinner size="sm" />
        ) : (
          <>
            <Text color="#0F1C33" fontSize="14px" fontWeight="medium">
              Mint NoFA as NFT
            </Text>
            <LoveIcon />
          </>
        )}
      </Button>

      {loading && <LoadingStatus />}

      {error && (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          p={4}
          bg="#0F1C33"
          borderRadius="15px"
        >
          <Text color="white">Error: {error}</Text>
        </MotionBox>
      )}

      {txHash && (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          p={4}
          borderRadius="15px"
          bg="#EA5D5D"
          mb={2}
        >
          <Text fontWeight="semibold" color="white">
            NFT Minting Transaction:
          </Text>
          <Text fontFamily="mono" wordBreak="break-all" color="white">
            {txHash}
          </Text>
        </MotionBox>
      )}
    </VStack>
  );
}
