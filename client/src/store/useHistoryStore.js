import axios from "@/lib/axios";
import { create } from "zustand";

export const useHistoryStore = create((set) => ({
  historyRecipes: [],
  historyRecipeLoading: false,
  creatingRecipe: false,

  getHistoryRecipes: async () => {
    set({historyRecipeLoading: false});
    try {
        const res = await axios.get('/history/getHistory');
        set({historyRecipeLoading: false, historyRecipes: res.data.historyRecipes});
    } catch (error) {
        set({historyRecipeLoading: false, historyRecipes: []});
        console.error(error);
    }
  },
}));
