export interface NewsItem {
    title: string;
    image_url: string;
    news_url: string;
    sentiment: "Positive" | "Negative" | "Neutral";
  }