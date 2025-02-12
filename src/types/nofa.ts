export interface Headline {
  title: string | null | undefined;
  imageURL: string | null | undefined;
  link: string | null | undefined;
  sentiment: "Positive" | "Negative" | "Neutral" | null;
}

export interface NoFA {
  id: string | null;
  coinId: string
  creatorAuthId: string | null | undefined; // UUID
  txnHash: string | null | undefined; // Transaction hash
  ipfsURI: string | null | undefined;
  coinImageURI: string | null | undefined;
  marketCap: number | null | undefined;
  totalSupply: number | null | undefined;
  circulatingSupply: number | null | undefined;
  headlines: Headline[] | null | undefined;
  timeCreated: string | null | undefined;// Array of headline objects
  storageURI: string | null | undefined
}


export interface CreateNoFAProps {
    coinId: string;
    creatorAuthId: string | null | undefined;
    txnHash?: string | null | undefined;
    ipfsURI?: string | null | undefined;
    coinImageURI?: string | null | undefined;
    storageURI?: string | null | undefined;
    marketCap?: number | null | undefined;
    totalSupply?: number | null | undefined;
    circulatingSupply?: number | null | undefined;
    headlines?: Headline[] | null | undefined;
  }
