import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useHistoryStore = create((set) => ({
  historyRecipes: [],
  historyRecipeLoading: false,
  creatingRecipe: false,

  getHistoryRecipes: async () => {
    set({ historyRecipeLoading: true });
    try {
      const res = await axios.get("/history/getHistory");
      set({
        historyRecipeLoading: false,
        historyRecipes: res.data.historyRecipes,
      });
    } catch (error) {
      set({ historyRecipeLoading: false, historyRecipes: [] });
      console.error(error);
    }
  },

  createRescipe: async (data) => {
    set({ creatingRecipe: true });
    try {
      const res = await axios.post("/history/createRescipe", { data });
      set((state) => ({
        creatingRecipe: false,
        historyRecipes: [res.data.historyRecipe, ...state.historyRecipes],
      }));
      toast.success("Recipe generated successfully");
      return {id: res.data?.historyRecipe?._id}
    } catch (error) {
      set({ historyRecipeLoading: false, historyRecipes: [] });
      console.error(error);
    }
  },
}));
