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

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ coinTicker: string }> }
) {
  try {
    const params = await props.params;
    const { coinTicker } = params;

    const response = await fetch(
      `https://cryptonews-api.com/api/v1?tickers=${coinTicker}&items=3&page=1&token=${process.env.CRYPTONEWS_API_KEY}`
    );

    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      return NextResponse.json([]);
    }

    const data: NewsResponse = await response.json();

    if (!data.data || data.data.length === 0) {
      return NextResponse.json([]);
    }

    const headlines = data.data.map(item => ({
      title: item.title,
      imageURL: item.image_url,
      link: item.news_url,
      sentiment: item.sentiment,
    }));

    return NextResponse.json(headlines);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json([]);
  }
}