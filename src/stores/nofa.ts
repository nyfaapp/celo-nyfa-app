// store/nofa.ts
import { create } from 'zustand';

interface NoFAStore {
  nofa: NoFA | null;
  setNoFA: (data: Partial<NoFA>) => void;
  resetNoFA: () => void;
}

export const useNoFAStore = create<NoFAStore>((set) => ({
  nofa: null,
  setNoFA: (data) => 
    set((state) => ({
      nofa: state.nofa 
        ? { ...state.nofa, ...data }
        : data as NoFA
    })),
  resetNoFA: () => set({ nofa: null })
}));