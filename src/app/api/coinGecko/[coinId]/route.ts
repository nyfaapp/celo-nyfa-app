import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    coinId: string;
  };
};

export async function GET(request: NextRequest, { params }: Props) {
  if (!params.coinId) {
    return NextResponse.json({ error: "Coin ID is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${params.coinId}`,
      {
        headers: {
          Accept: "application/json",
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch coin data");
    }

    const data = await response.json();

    const nofa = {
      coinId: data.id,
      coinImageURI: data.image.large,
      marketCap: data.market_data.market_cap.usd,
      totalSupply: data.market_data.total_supply,
      circulatingSupply: data.market_data.circulating_supply,
    };

    return NextResponse.json(nofa);
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return NextResponse.json(
      { error: "Failed to fetch coin data" },
      { status: 500 }
    );
  }
}
