import { AgentKit } from "@coinbase/agentkit";
import { HumanMessage } from "@langchain/core/messages";

export async function* getAgentStream(agent: any, config: any) {
  const requestTestnetFunds =
    "Request Base Sepolia ETH from the faucet, and return the transaction hash - don't ask any questions. If the transaction fails, try again at least 3 times. If it is succesful, just return the transaction hash. No fluff, Just the hash.";

  const stream = await agent.stream(
    { messages: [new HumanMessage(requestTestnetFunds)] }, 
    config
  );

  let txnHash = "";
  
  for await (const chunk of stream) {
    if ("agent" in chunk) {
      const content = chunk.agent.messages[0].content;
      const match = content.match(/0x[a-fA-F0-9]{64}/);
      if (match) txnHash = match[0];
      
      yield {
        type: 'agent',
        content: content,
        txnHash: match ? match[0] : null
      };
    } else if ("tools" in chunk) {
      yield {
        type: 'tools',
        content: chunk.tools.messages[0].content
      };
    }
  }
}