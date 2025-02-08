import { initializeAgent } from "@/config/init-agent";
import { NoFANFTAddress } from "@/utils/NoFANFTAddress";
import { HumanMessage } from "@langchain/core/messages";

interface StreamRequest {
  privyWalletId: string;
  ipfsURI: string;
  userWalletAddress: string;
}

const createMasterPrompt = ({ userWalletAddress, ipfsURI }: Partial<StreamRequest>) => `Execute these steps in order without asking questions:

1. Check wallet balance on Base Sepolia for ${userWalletAddress}.
   - If balance >= 0.001 ETH, proceed to step 3
   - If balance < 0.001 ETH, proceed to step 2

2. If balance is insufficient:
   - Request Base Sepolia ETH from faucet
   - Keep retrying if faucet request fails until successful
   - Return ONLY the faucet transaction hash once successful
   - Stop faucet requests after first success

3. Use the erc721uristorage action to mint the NFT with:
   * contractAddress: ${NoFANFTAddress}
   * to: ${userWalletAddress}
   * uri: ${ipfsURI}
   - Return ONLY the mint transaction hash

Return transaction hashes without any additional text.`;

const streamMessage = (type: "agent" | "tools", content: string, txnHash?: string | null) => 
  JSON.stringify({ type, content, txnHash }) + "\n";

export async function POST(req: Request) {
  try {
    const { privyWalletId, ipfsURI, userWalletAddress } = (await req.json()) as StreamRequest;

    // Validate required parameters
    if (!privyWalletId || !ipfsURI || !userWalletAddress) {
      return new Response(
        JSON.stringify({
          error: "Missing required parameters: privyWalletId, ipfsURI, and userWalletAddress are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Set up streaming response
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Start processing in the background
    (async () => {
      try {
        const { agent, config } = await initializeAgent(privyWalletId);

        // Send initial status
        await writer.write(
          encoder.encode(
            streamMessage("agent", "Initializing minting process...")
          )
        );

        const masterPrompt = createMasterPrompt({ userWalletAddress, ipfsURI });
        const agentStream = await agent.stream(
          { messages: [new HumanMessage(masterPrompt)] },
          config
        );

        for await (const chunk of agentStream) {
          if ("agent" in chunk) {
            const content = chunk.agent.messages[0].content;
            const match = content.match(/0x[a-fA-F0-9]{64}/);
            
            // Format message based on content
            let messageContent = content;
            if (match) {
              messageContent = content.includes("mint") 
                ? `NFT Minted successfully. Transaction hash: ${match[0]}`
                : `Received funds from faucet. Transaction hash: ${match[0]}`;
            }

            await writer.write(
              encoder.encode(
                streamMessage("agent", messageContent, match ? match[0] : null)
              )
            );
          } else if ("tools" in chunk) {
            await writer.write(
              encoder.encode(
                streamMessage("tools", chunk.tools.messages[0].content)
              )
            );
          }
        }

        // Send completion message
        await writer.write(
          encoder.encode(
            streamMessage("agent", "Process completed successfully.")
          )
        );
      } catch (error) {
        console.error("Stream error:", error);
        const errorMessage = error instanceof Error 
          ? error.message 
          : "Unknown error occurred";
          
        await writer.write(
          encoder.encode(
            streamMessage("agent", `Error: ${errorMessage}`)
          )
        );
      } finally {
        await writer.close();
      }
    })();

    // Return the readable stream
    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Request error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}