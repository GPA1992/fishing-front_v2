import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { customStorage } from "@/core/request";

import { DEFAULT_BASE_LAYER_ID, type BaseLayerId } from "./base-layers";

type MapState = {
  baseLayerId: BaseLayerId;
  zoom: number | null;
  hasHydrated: boolean;
};

type MapActions = {
  setBaseLayer: (id: BaseLayerId) => void;
  setZoom: (zoom: number) => void;
  setHasHydrated: (value: boolean) => void;
};

export const mapStore = create<MapState & MapActions>()(
  persist(
    (set) => ({
      baseLayerId: DEFAULT_BASE_LAYER_ID,
      zoom: null,
      hasHydrated: false,
      setBaseLayer: (id) => set(() => ({ baseLayerId: id })),
      setZoom: (zoom) => set(() => ({ zoom })),
      setHasHydrated: (value) => set(() => ({ hasHydrated: value })),
    }),
    {
      name: "mapStore",
      storage: createJSONStorage(() => customStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) return;
        state?.setHasHydrated(true);
      },
    }
  )
);
