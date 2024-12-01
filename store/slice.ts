import { defineStore } from "pinia";
import type { Todos } from "./types";

export const useSliceStore = defineStore("slice", {
  state: () => ({
    isData: null as Todos | null,
  }),
  actions: {
    setData(data: Todos) {
      this.isData = data;
    },
  },
});
