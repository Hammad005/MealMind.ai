import axios from "@/lib/axios";
import { create } from "zustand";

export const useSharedStore = create((set) => ({
  sharedRecipes: [],
  shareRecipeLoading: false,

  getSharedRecipes: async () => {
   set({shareRecipeLoading: true});
   try {
    const res = await axios.get('/shareRecipe/getSharedRecipe');
    set({shareRecipeLoading: false, sharedRecipes: res.data.sharedRecipes});
   } catch (error) {
    set({shareRecipeLoading: false, sharedRecipes: []});
    console.error(error);
   }
  },
}));
