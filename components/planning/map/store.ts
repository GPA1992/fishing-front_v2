import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { customStorage } from "@/core/request";
import { DEFAULT_BASE_LAYER_ID, type BaseLayer } from "./base-layers";

type State = {
  baseLayerId: BaseLayer["id"];
  zoom: number | null;
};

type Actions = {
  setProperty: <K extends keyof State>(k: K, v: State[K]) => void;
};
const initial: State = {
  zoom: null,
  baseLayerId: DEFAULT_BASE_LAYER_ID,
};

export const mapStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initial,
      setProperty: (k, v) => set((state) => ({ ...state, [k]: v })),
    }),
    {
      name: "mapStore",
      storage: createJSONStorage(() => customStorage),
    }
  )
);
