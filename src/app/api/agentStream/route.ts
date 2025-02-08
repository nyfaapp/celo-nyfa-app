// app/api/agent-stream/route.ts
import { getAgentKitFromPrivy } from "@/config/get-agentkit";
import { initializeAgent } from "@/config/init-agent";
import { NoFANFTAddress } from "@/utils/NoFANFTAddress";
import { HumanMessage } from "@langchain/core/messages";

export async function POST(req: Request) {
  try {
    const { privyWalletId, ipfsURI, userWalletAddress } = await req.json();

    // Validate required parameters
    if (!privyWalletId || !ipfsURI || !userWalletAddress) {
      return new Response(
        JSON.stringify({
          error:
            "Missing required parameters: privyWalletId and ipfsURI are required",
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

        const masterPrompt = `Execute these steps in order without asking questions:

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

        // Send initial status
        await writer.write(
          encoder.encode(
            JSON.stringify({
              type: "agent",
              content: "Starting the minting process...",
            }) + "\n"
          )
        );

        const agentStream = await agent.stream(
          { messages: [new HumanMessage(masterPrompt)] },
          config
        );

        for await (const chunk of agentStream) {
          if ("agent" in chunk) {
            const content = chunk.agent.messages[0].content;
            const match = content.match(/0x[a-fA-F0-9]{64}/);

            await writer.write(
              encoder.encode(
                JSON.stringify({
                  type: "agent",
                  content: content,
                  txnHash: match ? match[0] : null,
                }) + "\n"
              )
            );
          } else if ("tools" in chunk) {
            await writer.write(
              encoder.encode(
                JSON.stringify({
                  type: "tools",
                  content: chunk.tools.messages[0].content,
                }) + "\n"
              )
            );
          }
        }
      } catch (error) {
        console.error("Stream error:", error);
        await writer.write(
          encoder.encode(
            JSON.stringify({
              type: "agent",
              content:
                "Error: " +
                (error instanceof Error
                  ? error.message
                  : "Unknown error occurred"),
            }) + "\n"
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
        error: "Failed to process request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
