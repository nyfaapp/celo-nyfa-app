import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { getAgentKitFromPrivy } from "./get-agentkit";


/**
 * Initialize the agent with CDP AgentKit
 *
 * @returns Agent executor and config
 */
export async function initializeAgent(privyWalletId: string) {

  const qwenLLM = new ChatOpenAI({
    model: "qwen-max-2025-01-25",
    apiKey: process.env.QWEN_API_KEY,
    configuration: {
      baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
    },
  });

  const tools = await getLangChainTools(await getAgentKitFromPrivy(privyWalletId));

  // Store buffered conversation history in memory
  const memory = new MemorySaver();
  const agentConfig = {
    configurable: { thread_id: "CDP AgentKit Chatbot Example!" },
  };

  // Create React Agent using the LLM and CDP AgentKit tools
  const agent = createReactAgent({
    llm: qwenLLM,
    tools,
    checkpointSaver: memory,
    messageModifier:
      "You are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit...",
  });

  return { agent, config: agentConfig };
}