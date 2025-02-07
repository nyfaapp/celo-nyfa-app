// lib/privy-agentkit.ts
import { PrivyClient } from "@privy-io/server-auth";
import { createViemAccount } from "@privy-io/server-auth/viem";
import { Address, LocalAccount, createWalletClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import {
    AgentKit,
    cdpApiActionProvider,
    erc721ActionProvider,
    ViemWalletProvider,
    walletActionProvider,
} from "@coinbase/agentkit";
import { privy } from "./privy";


const erc721 = erc721ActionProvider();
const cdp = cdpApiActionProvider({
    apiKeyName: process.env.CDP_API_KEY_NAME!,
    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY!,
});
const wallet = walletActionProvider();

export async function getAgentKitFromPrivy(privyWalletId: string): Promise<any> {
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
        transport: http(),
    });

    // Create wallet provider
    const walletProvider = new ViemWalletProvider(client);

    // Initialize and return AgentKit
    return await AgentKit.from({
        walletProvider,
        actionProviders: [erc721, wallet, cdp],
    });
}