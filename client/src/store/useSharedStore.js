import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useSharedStore = create((set) => ({
  sharedRecipes: [],
  sendedRecipes: [],
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
  getSendedRecipe: async () => {
    set({shareRecipeLoading: true});
    try {
      const res = await axios.get('/shareRecipe/getSendedRecipe');
      set({shareRecipeLoading: false, sendedRecipes: res.data.sendedRecipes});
    } catch (error) {
      set({shareRecipeLoading: false, sendedRecipes: []});
      console.error(error);
    }
  },

  shareHistoryRecipe: async (receiverId, historyId) => {
    set({shareRecipeLoading: true});
    try {
      const res = await axios.post(`/shareRecipe/shareHistoryRecipe/${receiverId}`, {historyId});
      set((state) => ({
        shareRecipeLoading: false,
        sharedRecipes: [res.data.shareRecipe, ...state.sharedRecipes],
      }))
      toast.success("Recipe sent successfully");
    } catch (error) {
      set({shareRecipeLoading: false});
      toast.error(error.response.data.error);
      console.error(error);
    }
  }
}));
