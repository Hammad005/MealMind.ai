import axios from "@/lib/axios";
import { toast } from "sonner";
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

  saveRecipe: async (id) => {
    set({ savedRecipeLoading: true });
    try {
      const res = await axios.post(`/saved/saveRescipe/${id}`);
      set((state) => ({
        savedRecipeLoading: false,
        savedRecipes: [res.data.savedRecipe, ...state.savedRecipes],
      }));
      toast.success("Recipe saved successfully");
    } catch (error) {
      set({ savedRecipeLoading: false });
      console.error(error);
    }
  },

  unsaveRecipe: async (id) => {
    set({ savedRecipeLoading: true });
    try {
      const res = await axios.delete(`/saved/unsaveRescipe/${id}`);
      set({
        savedRecipeLoading: false,
        savedRecipes: res.data.savedRecipes,
      });
      toast.success("Recipe unsaved successfully");
    } catch (error) {
      set({ savedRecipeLoading: false });
      console.error(error);
    }
  },

  saveSharedRecipe: async (id) => {
    set({ savedRecipeLoading: true });
    try {
      const res = await axios.post(`/saved/saveSharedRescipe/${id}`);
      set((state) => ({
        savedRecipeLoading: false,
        savedRecipes: [res.data.savedRecipe, ...state.savedRecipes],
      }));
      toast.success("Recipe saved successfully");
    } catch (error) {
      set({ savedRecipeLoading: false });
      console.error(error);
    }
  }
}));
