interface Headline {
  title: string | null | undefined;
  imageURL: string | null | undefined;
  link: string | null | undefined;
  sentiment: "Positive" | "Negative" | "Neutral" | null;
}

interface NoFA {
  coinId: string
  creatorAuthId: string | null | undefined; // UUID
  txnHash: string | null | undefined; // Transaction hash
  URI: string | null | undefined;
  coinImageURI: string | null | undefined;
  marketCap: number | null | undefined;
  totalSupply: number | null | undefined;
  circulatingSupply: number | null | undefined;
  headlines: Headline[] | null | undefined; // Array of headline objects
}


interface CreateNoFAProps {
    coinId: string;
    creatorAuthId: string | null | undefined;
    txnHash?: string | null | undefined;
    URI?: string | null | undefined;
    coinImageURI?: string | null | undefined;
    marketCap?: number | null | undefined;
    totalSupply?: number | null | undefined;
    circulatingSupply?: number | null | undefined;
    headlines?: Headline[] | null | undefined;
  }
