import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { customStorage } from "../../common";
import { type fishAnalysisData as FishAnalysisData } from "../types";

type State = {
  analysisLoading: boolean;
  fishAnalysisData: FishAnalysisData | null;
  hasHydrated: boolean;
};

const initial: State = {
  fishAnalysisData: null,
  analysisLoading: false,
  hasHydrated: false,
};

type Actions = {
  setProperty: <K extends keyof State>(k: K, v: State[K]) => void;
  reset: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const fishAnalysisDataStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initial,
        setProperty: (k, v) => set((state) => ({ ...state, [k]: v })),
        reset: () => set(initial),
        setHasHydrated: (value) =>
          set((state) => ({ ...state, hasHydrated: value })),
      }),
      {
        name: "fishAnalysisDataStore",
        storage: createJSONStorage(() => customStorage),
        onRehydrateStorage: () => (state, error) => {
          if (error) return;
          // chama a action da própria store
          state?.setHasHydrated(true);
        },
      }
    )
  )
);
