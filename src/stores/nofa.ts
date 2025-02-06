import { supabase } from "@/config/supabase";
import { NoFA } from "@/types/nofa";
import { create } from "zustand";

interface NoFAStore {
 nofa: NoFA | null;
 userNofas: NoFA[];
 allNofas: NoFA[];
 isLoading: boolean;
 isLoadingAll: boolean;
 setNoFA: (data: Partial<NoFA>) => void;
 resetNoFA: () => void;
 fetchUserNoFAs: (creatorAuthId: string) => Promise<void>;
 fetchAllNoFAs: () => Promise<void>;
 setUserNoFAs: (nofas: NoFA[]) => void;
}

export const useNoFAStore = create<NoFAStore>((set) => ({
 nofa: null,
 userNofas: [],
 allNofas: [],
 isLoading: false,
 isLoadingAll: false,
 setNoFA: (data) =>
   set((state) => ({
     nofa: state.nofa ? { ...state.nofa, ...data } : (data as NoFA),
   })),
 resetNoFA: () => set({ nofa: null }),
 fetchUserNoFAs: async (creatorAuthId: string) => {
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
         URI,
         coinImageURI,
         marketCap,
         totalSupply,
         circulatingSupply,
         headlines
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
 fetchAllNoFAs: async () => {
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
         URI,
         coinImageURI,
         marketCap,
         totalSupply,
         circulatingSupply,
         headlines
       `
       );

     if (error) {
       console.error("Error fetching all NoFAs:", error);
       return;
     }

     set({ allNofas: data as NoFA[], isLoadingAll: false });
   } catch (error) {
     console.error("Error in fetchAllNoFAs:", error);
     set({ allNofas: [], isLoadingAll: false });
   }
 },
 setUserNoFAs: (nofas) => set({ userNofas: nofas }),
}));