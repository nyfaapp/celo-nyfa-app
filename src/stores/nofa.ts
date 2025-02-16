import { NoFA } from "@/types/nofa";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { create } from "zustand";

interface NoFAStore {
  nofa: NoFA | null;
  userNofas: NoFA[];
  allNofas: NoFA[];
  isLoading: boolean;
  isLoadingAll: boolean;
  setNoFAFromData: (data: Partial<NoFA>) => void;
  resetNoFA: () => void;
  fetchUserNoFAs: (supabase: SupabaseClient, creatorAuthId: string) => Promise<void>;
  fetchAllOtherNoFAs: (supabase: SupabaseClient, creatorAuthId: string) => Promise<void>;
  setUserNoFAs: (nofas: NoFA[]) => void;
}

export const useNoFAStore = create<NoFAStore>((set) => ({
  nofa: null,
  userNofas: [],
  allNofas: [],
  isLoading: false,
  isLoadingAll: false,
  setNoFAFromData: (data) => {
    set({ nofa: null }); // Reset first
    set((state) => ({ ...state, nofa: data as NoFA })); // Then set new data
  },
  resetNoFA: () => set({ nofa: null }),
  fetchUserNoFAs: async (supabase:SupabaseClient, creatorAuthId: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from("NOFAS")
        .select(
          `
          id,
          coinId,
          creatorAuthId,
          txnHash,
          ipfsURI,
          coinImageURI,
          marketCap,
          totalSupply,
          circulatingSupply,
          headlines,
          timeCreated,
          storageURI
        `
        )
        .eq("creatorAuthId", creatorAuthId);

      if (error) {
        console.error("Error fetching user NoFAs:", error);
        return;
      }

      set({ userNofas: data as NoFA[], isLoading: false });
    } catch (error) {
      console.error("Error in fetchUserNoFAs:", error);
      set({ userNofas: [], isLoading: false });
    }
  },
  fetchAllOtherNoFAs: async (supabase:SupabaseClient, creatorAuthId: string) => {
    set({ isLoadingAll: true });
    try {
      const { data, error } = await supabase
        .from("NOFAS")
        .select(
          `
          id,
          coinId,
          creatorAuthId,
          txnHash,
          ipfsURI,
          coinImageURI,
          marketCap,
          totalSupply,
          circulatingSupply,
          headlines,
          timeCreated,
          storageURI
        `
        )
        .neq("creatorAuthId", creatorAuthId);

      if (error) {
        console.error("Error fetching other NoFAs:", error);
        return;
      }

      set({ allNofas: data as NoFA[], isLoadingAll: false });
    } catch (error) {
      console.error("Error in fetchAllOtherNoFAs:", error);
      set({ allNofas: [], isLoadingAll: false });
    }
  },
  setUserNoFAs: (nofas) => set({ userNofas: nofas }),
}));
