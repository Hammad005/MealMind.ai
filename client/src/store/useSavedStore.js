import axios from "@/lib/axios";
import { create } from "zustand";

export const useSavedStore = create((set) => ({
  savedRecipes: [],
  savedRecipeLoading: false,

  getSavedRecipes: async () => {
    set({ savedRecipeLoading: true });
    try {
      const res = await axios.get("/saved/getSavedRecipe");
      set({ savedRecipeLoading: false, savedRecipes: res.data.savedRecipes });
    } catch (error) {
      set({ savedRecipeLoading: false, savedRecipes: [] });
      console.error(error);
    }
  },
}));
