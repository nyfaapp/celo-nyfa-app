"use client";
import { useState } from "react";
import { Box, VStack, Text, Button } from "@chakra-ui/react";
import { Spinner } from "@heroui/spinner";

interface StreamMessage {
  type: "agent" | "tools";
  content: string;
  txnHash?: string | null;
}

export default function AgentStreamComponent({
  privyWalletId,
}: {
  privyWalletId: string;
}) {
  const [messages, setMessages] = useState<StreamMessage[]>([]);
  const [txnHash, setTxnHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agentBgColor = "#0F1C33";
  const toolsBgColor = "#0F1C33";
  const txHashBgColor = "#EA5D5D";

  const processChunk = (chunk: string) => {
    // Process chunk line by line
    const lines = chunk.split('\n');
    
    for (const line of lines) {
      if (!line.trim()) continue;
      
      try {
        const message = JSON.parse(line);
        setMessages(prev => [...prev, message]);
        
        if (message.txnHash) {
          setTxnHash(message.txnHash);
        }
      } catch (e) {
        console.error("Error parsing message:", e);
      }
    }
  };

  const startStream = async () => {
    setLoading(true);
    setError(null);
    setMessages([]);
    setTxnHash(null);

    try {
      const response = await fetch("/api/agentStream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ privyWalletId }),
      });

      if (!response.ok) throw new Error("Stream request failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      let buffer = ''; // Buffer for incomplete chunks
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode the chunk and add to buffer
        const chunk = new TextDecoder().decode(value);
        buffer += chunk;

        // Find complete messages (ending with newline)
        const lastNewLine = buffer.lastIndexOf('\n');
        if (lastNewLine !== -1) {
          const completeChunk = buffer.slice(0, lastNewLine);
          buffer = buffer.slice(lastNewLine + 1);
          processChunk(completeChunk);
        }
      }

      // Process any remaining buffer
      if (buffer) {
        processChunk(buffer);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack align="stretch" w="full">
      <Button
        bgColor="#A9CEEB"
        borderRadius={15}
        w="full"
        onClick={startStream}
        disabled={loading}
        mb={4}
        alignSelf="center"
      >
        {loading ? (
          <Spinner size="sm" />
        ) : (
          <Text color="#0F1C33" fontSize="14px" fontWeight="medium">
            Start agent kit ...
          </Text>
        )}
      </Button>

      {error && (
        <Box p={4} bg="#0F1C33" borderRadius="md">
          <Text color="white">Error: {error}</Text>
        </Box>
      )}

      <VStack align="stretch">
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            p={4}
            borderRadius="md"
            bg={msg.type === "agent" ? agentBgColor : toolsBgColor}
          >
            <Text fontSize="sm" color="gray.500" textTransform="capitalize">
              {msg.type}
            </Text>
            <Text mt={1} color="white">
              {msg.content}
            </Text>
          </Box>
        ))}
      </VStack>

      {txnHash && (
        <Box mt={4} p={4} borderRadius="md" bg={txHashBgColor}>
          <Text fontWeight="semibold" color="white">
            Transaction Hash:
          </Text>
          <Text fontFamily="mono" wordBreak="break-all" color="white">
            {txnHash}
          </Text>
        </Box>
      )}
    </VStack>
  );
}