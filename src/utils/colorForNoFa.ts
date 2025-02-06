import { Headline } from "@/types/nofa";

export const getColorBySentiment = (sentiment: string | null) => {
  switch (sentiment?.toLowerCase()) {
    case "positive":
      return "#FDBB23"; // mustard
    case "negative":
      return "#EA5D5D"; // plum
    case "neutral":
    default:
      return "#A9CEEB"; // sky blue
  }
};

export const getColorForNoFA = (headlines: Headline[] | null | undefined) => {
  if (!headlines || headlines.length === 0) {
    return getColorBySentiment("neutral");
  }

  // Count occurrences of each sentiment
  const sentimentCounts = headlines.reduce((acc, headline) => {
    const sentiment = headline.sentiment?.toLowerCase() || "neutral";
    acc[sentiment] = (acc[sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Find the sentiment with the highest count
  const entries = Object.entries(sentimentCounts);
  const [dominantSentiment] = entries.reduce((max, current) =>
    current[1] > max[1] ? current : max
  );

  // If there's a tie, return neutral
  const isDominant =
    entries.filter(([_, count]) => count === sentimentCounts[dominantSentiment])
      .length === 1;

  return isDominant
    ? getColorBySentiment(dominantSentiment)
    : getColorBySentiment("neutral");
};
