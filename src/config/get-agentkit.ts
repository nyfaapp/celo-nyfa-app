import { createViemAccount } from "@privy-io/server-auth/viem";
import {
  Address,
  createWalletClient,
  encodeFunctionData,
  http,
  parseAbi,
} from "viem";
import { baseSepolia } from "viem/chains";
import {
  AgentKit,
  cdpApiActionProvider,
  customActionProvider,
  erc721ActionProvider,
  EvmWalletProvider,
  ViemWalletProvider,
  walletActionProvider,
} from "@coinbase/agentkit";
import { privy } from "./privy";
import { z } from "zod";

// Action providers
const erc721 = erc721ActionProvider();
const cdp = cdpApiActionProvider({
  apiKeyName: process.env.CDP_API_KEY_NAME!,
  apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY!,
});
const wallet = walletActionProvider();

const mintParamsSchema = z.object({
  to: z.string().describe("Address to mint the NFT to"),
  uri: z.string().describe("Token URI for the NFT metadata"),
  contractAddress: z.string().describe("NFT contract address"),
});

const erc721uristorage = customActionProvider<EvmWalletProvider>({
  name: "erc721_uristorage",
  description: "Mint ERC721URIStorage NFTs",
  schema: mintParamsSchema,
  invoke: async (walletProvider, args) => {
    const { to, uri, contractAddress } = args;

    // Define the ABI for the mint function
    const abi = parseAbi([
      "function mint(address to, string memory uri) public returns (uint256)",
    ]);

    // Encode the function call
    const data = encodeFunctionData({
      abi,
      functionName: "mint",
      args: [to, uri],
    });

    // Send the transaction
    const hash = await walletProvider.sendTransaction({
      to: contractAddress,
      data,
      value: BigInt(0),
    });

    return {
      success: true,
      hash,
      message: `Successfully initiated mint transaction with hash: ${hash}`,
    };
  },
});

/**
 * Retrieves an AgentKit instance using the provided Privy wallet ID.
 *
 * @param privyWalletId - The ID of the Privy wallet to retrieve.
 * @returns A promise that resolves to an AgentKit instance.
 *
 * @throws Will throw an error if the wallet retrieval or AgentKit initialization fails.
 *
 * @example
 * ```typescript
 * const agentKit = await getAgentKitFromPrivy('your-privy-wallet-id');
 * ```
 */
export async function getAgentKitFromPrivy(
  privyWalletId: string
): Promise<any> {
  // Get the wallet from Privy
  const privyWallet = await privy.walletApi.getWallet({ id: privyWalletId });

  // Create Viem account
  const account = await createViemAccount({
    walletId: privyWallet.id,
    address: privyWallet.address as Address,
    privy,
  });

  // Create wallet client
  const client = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(
      `https://lb.drpc.org/ogrpc?network=base-sepolia&dkey=${process.env.DRPC_API_KEY}`
    ),
  });

  // Create wallet provider
  const walletProvider = new ViemWalletProvider(client);

  // Initialize and return AgentKit
  return await AgentKit.from({
    walletProvider,
    actionProviders: [wallet, cdp, erc721, erc721uristorage],
  });
}
