// app/api/agent-stream/route.ts
import { getAgentKitFromPrivy } from "@/config/get-agentkit";
import { initializeAgent } from "@/config/init-agent";
import { HumanMessage } from "@langchain/core/messages";

export async function POST(req: Request) {
  const { privyWalletId } = await req.json();

  // Set up streaming response
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  // Start processing in the background
  (async () => {
    try {

      const { agent } = await initializeAgent(privyWalletId);

      const requestTestnetFunds = "Request Base Sepolia ETH from the faucet, and return the transaction hash - don't ask any questions. If the transaction fails, try again at least 3 times. If it is succesful, just return the transaction hash. No fluff, Just the hash.";

      const agentStream = await agent.stream(
        { messages: [new HumanMessage(requestTestnetFunds)] },
        {} // config object if needed
      );

      for await (const chunk of agentStream) {
        if ("agent" in chunk) {
          const content = chunk.agent.messages[0].content;
          const match = content.match(/0x[a-fA-F0-9]{64}/);
          
          await writer.write(
            encoder.encode(
              JSON.stringify({
                type: 'agent',
                content: content,
                txnHash: match ? match[0] : null
              }) + '\n'
            )
          );
        } else if ("tools" in chunk) {
          await writer.write(
            encoder.encode(
              JSON.stringify({
                type: 'tools',
                content: chunk.tools.messages[0].content
              }) + '\n'
            )
          );
        }
      }
    } catch (error) {
      console.error('Stream error:', error);
      await writer.write(
        encoder.encode(
          JSON.stringify({
            type: 'agent',
            content: 'Error: ' + (error instanceof Error ? error.message : 'Unknown error occurred')
          }) + '\n'
        )
      );
    } finally {
      await writer.close();
    }
  })();

  // Return the readable stream
  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}