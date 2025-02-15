import { Creator } from "@/types/creator";
import { create } from "zustand";

interface CreatorStore {
  creator: Creator | null;
  isLoading: boolean;
  setCreator: (data: Partial<Creator>) => void;
  resetCreator: () => void;
  fetchCreator: (authId: string) => Promise<void>;
}

export const useCreatorStore = create<CreatorStore>((set) => ({
  creator: null,
  isLoading: false,

  setCreator: (data) => {
    set((state) => ({ ...state, creator: data as Creator }));
  },

  resetCreator: () => set({ creator: null }),

  fetchCreator: async (authId: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from("CREATORS")
        .select("*")
        .eq("authId", authId)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
        set({ creator: null, isLoading: false });
        return;
      }

      set({ creator: data as Creator, isLoading: false });
    } catch (error) {
      console.error("Error in fetchCreator:", error);
      set({ creator: null, isLoading: false });
    }
  },
}));