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
        sendedRecipes: [res.data.shareRecipe, ...state.sendedRecipes],
      }))
      toast.success("Recipe sent successfully");
    } catch (error) {
      set({shareRecipeLoading: false});
      toast.error(error.response.data.error);
      console.error(error);
    }
  },
  shareSavedRecipe: async (receiverId, savedId) => {
    set({shareRecipeLoading: true});
    try {
      const res = await axios.post(`/shareRecipe/shareSavedRecipe/${receiverId}`, {savedId});
      set((state) => ({
        shareRecipeLoading: false,
        sendedRecipes: [res.data.shareRecipe, ...state.sendedRecipes],
      }))
      toast.success("Recipe sent successfully");
    } catch (error) {
      set({shareRecipeLoading: false});
      toast.error(error.response.data.error);
      console.error(error);
    }
  },
  shareSharedRecipe: async (receiverId, sharedId) => {
    set({shareRecipeLoading: true});
    try {
      const res = await axios.post(`/shareRecipe/shareSharedRecipe/${receiverId}`, {sharedId});
      set((state) => ({
        shareRecipeLoading: false,
        sendedRecipes: [res.data.shareRecipe, ...state.sendedRecipes],
      }))
      toast.success("Recipe sent successfully");
    } catch (error) {
      set({shareRecipeLoading: false});
      toast.error(error.response.data.error);
      console.error(error);
    }
  },

  deleteSharedRecipe: async (id) => {
    set({shareRecipeLoading: true});
   try {
    const res = await axios.delete(`/shareRecipe/deleteSharedRecipe/${id}`);
    set({shareRecipeLoading: false, sharedRecipes: res.data.sharedRecipes});
    toast.success("Shared recipe deleted successfully");
    return {success: true};
   } catch (error) {
    set({shareRecipeLoading: false});
    console.error(error);
   }
  }
}));
