import { NextRequest, NextResponse } from "next/server";

interface NewsItem {
  title: string;
  image_url: string;
  news_url: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  text: string;
  source_name: string;
  date: string;
  topics: string[];
  type: string;
  tickers: string[];
}

interface NewsResponse {
  data: NewsItem[];
  total_items: number;
  total_pages: number;
}

interface Headline {
  title: string | null;
  imageURL: string | null;
  link: string | null;
  sentiment: "Positive" | "Negative" | "Neutral" | null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { coinTicker: string } }
) {
  const { coinTicker } = params;

  try {
    const response = await fetch(
      `https://cryptonews-api.com/api/v1?tickers=${coinTicker}&items=3&page=1&token=${process.env.CRYPTONEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news data");
    }

    const data: NewsResponse = await response.json();

    if (!data.data || data.data.length === 0) {
      return NextResponse.json([]);
    }

    const headlines: Headline[] = data.data.map((item: NewsItem) => ({
      title: item.title ? item.title : null,
      imageURL: item.image_url ? item.image_url : null,
      link: item.news_url ? item.news_url : null,
      sentiment: item.sentiment ? item.sentiment : null,
    }));

    return NextResponse.json(headlines);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news data" },
      { status: 500 }
    );
  }
}