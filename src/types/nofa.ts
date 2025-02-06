interface Headline {
  title: string | null;
  imageURL: string | null;
  link: string | null;
  sentiment: "Positive" | "Negative" | "Neutral" | null
}

interface NoFA {
  coinId: string
  creatorAuhId: string; // UUID
  txnHash: string | null; // Transaction hash
  URI: string | null;
  coinImageURI: string | null;
  marketCap: number | null;
  totalSupply: number | null;
  circulatingSupply: number | null;
  headlines: Headline[] | null; // Array of headline objects
}


interface CreateNoFAProps {
    coinId: string;
    creatorAuthId: string;
    txnHash?: string | null;
    URI?: string | null;
    coinImageURI?: string | null;
    marketCap?: number | null;
    totalSupply?: number | null;
    circulatingSupply?: number | null;
    headlines?: Headline[] | null;
  }
