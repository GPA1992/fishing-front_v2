import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { customStorage } from "@/core/request";
import { DEFAULT_BASE_LAYER_ID, type BaseLayer } from "./base-layers";

type State = {
  baseLayerId: BaseLayer["id"];
};

type Actions = {
  setBaseLayerId: (id: BaseLayer["id"]) => void;
};

export const mapStore = create<State & Actions>()(
  persist(
    (set) => ({
      baseLayerId: DEFAULT_BASE_LAYER_ID,
      setBaseLayerId: (id) => set({ baseLayerId: id }),
    }),
    {
      name: "mapStore",
      storage: createJSONStorage(() => customStorage),
    }
  )
);
