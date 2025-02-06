// app/api/wallet/route.ts
import {
  PrivyClient,
  User,
  WalletApiWalletResponseType,
} from "@privy-io/server-auth";
import { NextResponse } from "next/server";
import test from "node:test";

const privy = new PrivyClient(
  process.env.PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET!,
  {
    walletApi: {
      authorizationPrivateKey: process.env.PRIVY_WALLET_AUTH_PRIVATE_KEY!,
    },
  }
);

export async function POST(request: Request) {
  try {
    const { privyWalletId, userWalletAddress, authId } = await request.json();

    console.log("userWalletAddress:", userWalletAddress);
    console.log("authId:", authId);
    console.log("privyWalletId:", privyWalletId);

    if (!userWalletAddress || !authId) {
      return NextResponse.json(
        {
          success: false,
          error: "walletAddress and authId are required",
        },
        { status: 400 }
      );
    }

    let thisPrivyWallet: WalletApiWalletResponseType | undefined = undefined;

    if (privyWalletId !== undefined) {
      const allPrivyWallets = await privy.walletApi.getWallets();

      for (let i = 0; i < allPrivyWallets.data.length; i++) {
        const wallet = allPrivyWallets.data[i];

        if (wallet.id === privyWalletId) {
          thisPrivyWallet = wallet;
          return NextResponse.json(
            {
              success: true,
              privyWalletId: thisPrivyWallet.id,
              privyWalletAddress: thisPrivyWallet.address,
            },
            { status: 200 }
          );
        }
      }
    }

    const wallet = await privy.walletApi.create({ chainType: "ethereum" });

    console.log("New wallet id:", wallet.id)

    return NextResponse.json(
      {
        success: true,
        privyWalletId: wallet.id,
        privyWalletAddress: wallet.address,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating Privy wallet:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create wallet",
      },
      { status: 500 }
    );
  }
}
