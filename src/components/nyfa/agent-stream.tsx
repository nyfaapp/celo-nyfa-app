"use client";
import { useState } from "react";
import { Box, VStack, Text, Button } from "@chakra-ui/react";
import { Spinner } from "@heroui/spinner";
import { motion } from "framer-motion";
import { LoveIcon } from "./svg-icons/love-icon";
import { useSupabase } from "@/providers/supabase-provider";
import { NoFA } from "@/types/nofa";
import { useNoFAStore } from "@/stores/nofa";

const MotionBox = motion(Box);

interface StreamMessage {
  type: "agent" | "tools";
  content: string;
  txnHash?: string | null;
}

interface Transaction {
  type: "faucet" | "mint";
  hash: string;
}

interface AgentStreamProps {
  privyWalletId: string;
  ipfsURI: string;
  userWalletAddress: string;
  nofaId: string;
}

export default function AgentStreamComponent({
  privyWalletId,
  ipfsURI,
  userWalletAddress,
  nofaId
}: AgentStreamProps) {
  const [messages, setMessages] = useState<StreamMessage[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<"idle" | "checking" | "funding" | "minting">("idle");

  const agentBgColor = "#0F1C33";
  const toolsBgColor = "#0F1C33";
  const txHashBgColor = "#EA5D5D";

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
  
      // Parse the returned data to match the NoFA interface
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
      };
  
      setNoFAFromData(parsedNoFA);
    } catch (err) {
      console.error("Error updating NoFA:", err);
    }
  };

  const processChunk = (chunk: string) => {
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (!line.trim()) continue;

      try {
        const message = JSON.parse(line);
        if (message.content?.trim()) {
          // Detect steps based on message content
          if (message.content.includes("balance")) {
            setCurrentStep("checking");
          } else if (message.content.includes("faucet")) {
            setCurrentStep("funding");
            const match = message.content.match(/0x[a-fA-F0-9]{64}/);
            if (match) {
              const hash = match[0];
              setTransactions(prev => [...prev, { type: "faucet", hash }]);
            }
          } else if (message.content.includes("mint") && message.content.includes("0x")) {
            setCurrentStep("minting");
            const match = message.content.match(/0x[a-fA-F0-9]{64}/);
            if (match) {
              const hash = match[0];
              setTransactions(prev => [...prev, { type: "mint", hash }]);
              updateNofaInSupabase(hash);
            }
          }

          setMessages((prev) => [...prev, message]);
        }
      } catch (e) {
        console.error("Error parsing message:", e);
      }
    }
  };

  const startStream = async () => {
    if (!ipfsURI) {
      setError("Please create and upload the NoFA to IPFS first");
      return;
    }

    setLoading(true);
    setError(null);
    setMessages([]);
    setTransactions([]);
    setCurrentStep("checking");

    try {
      const response = await fetch("/api/agentStream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          privyWalletId,
          ipfsURI,
          userWalletAddress
        }),
      });

      if (!response.ok) throw new Error("Stream request failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        buffer += chunk;

        const lastNewLine = buffer.lastIndexOf("\n");
        if (lastNewLine !== -1) {
          const completeChunk = buffer.slice(0, lastNewLine);
          buffer = buffer.slice(lastNewLine + 1);
          processChunk(completeChunk);
        }
      }

      if (buffer) {
        processChunk(buffer);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setCurrentStep("idle");
    }
  };

  const LoadingStatus = () => (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      p={4}
      borderRadius="15px"
      bg={agentBgColor}
      mb={4}
    >
      <Text color="white" fontSize="sm">
        {currentStep === "checking" && "Checking wallet balance..."}
        {currentStep === "funding" && "Requesting funds from faucet..."}
        {currentStep === "minting" && "Minting NFT..."}
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
      <Button
        bgColor="#A9CEEB"
        borderRadius={15}
        w="full"
        onClick={startStream}
        disabled={loading || !ipfsURI}
        mb={4}
        alignSelf="center"
      >
        {loading ? (
          <Spinner size="sm" />
        ) : (
          <>
            <Text color="#0F1C33" fontSize="14px" fontWeight="medium">
              Now, let Nyla mint your NoFA as NFT
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

      <VStack align="stretch">
        {messages.map((msg, idx) => (
          <MotionBox
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            p={4}
            mb={2}
            borderRadius="15px"
            bg={msg.type === "agent" ? agentBgColor : toolsBgColor}
          >
            <Text fontSize="sm" color="gray.500" textTransform="capitalize">
              {msg.type}
            </Text>
            <Text mt={1} color="white">
              {msg.content}
            </Text>
          </MotionBox>
        ))}
      </VStack>

      {transactions.length > 0 && (
        <VStack align="stretch">
          {transactions.map((tx, idx) => (
            <MotionBox
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              p={4}
              borderRadius="15px"
              bg={txHashBgColor}
              mb={2}
            >
              <Text fontWeight="semibold" color="white">
                {tx.type === "faucet" ? "Faucet Funding" : "NFT Minting"} Transaction:
              </Text>
              <Text fontFamily="mono" wordBreak="break-all" color="white">
                {tx.hash}
              </Text>
            </MotionBox>
          ))}
        </VStack>
      )}
    </VStack>
  );
}