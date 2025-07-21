import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useHistoryStore = create((set) => ({
  historyRecipes: [],
  historyRecipeLoading: false,
  progress: 0,


  getHistoryRecipes: async () => {
    set({ historyRecipeLoading: true });
    try {
      const res = await axios.get("/history/getHistory");
      set({
        historyRecipeLoading: false,
        historyRecipes: res.data.history,
      });
    } catch (error) {
      set({ historyRecipeLoading: false, historyRecipes: [] });
      console.error(error);
    }
  },

  createRescipe: async (text) => {
    
    set({ progress: 0 });

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const steps = [10, 35, 60, 75];

    for (let value of steps) {
      await delay(1500);
      set({ progress: value });
    }

    await delay(1500);
    try {
      const res = await axios.post("/history/createRescipe", {text});
      set((state) => ({
        progress: 100,
        historyRecipes: [res.data.history, ...state.historyRecipes],
      }));
      await delay(1000);
      toast.success("Recipe generated successfully");
      return {id: res.data?.history?._id}
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  },

  deleteSingleHistory: async (id) => {
    set({historyRecipeLoading: true});
    try {
       const res = await axios.delete(`/history/clearSingleHistory/${id}`);
      set({
        historyRecipeLoading: false,
        historyRecipes: res.data.history,
      });
      toast.success("History deleted successfully");
      return {success: true};
    } catch (error) {
      set({ historyRecipeLoading: false});
      console.error(error);
    }
  },

  clearHistory: async () => {
     set({historyRecipeLoading: true});
    try {
       const res = await axios.delete(`/history/clearHistory`);
      set({
        historyRecipeLoading: false,
        historyRecipes: res.data.history,
      });
      toast.success("History cleared successfully");
      return {success: true};
    } catch (error) {
      set({ historyRecipeLoading: false});
      console.error(error);
    }
  }
}));
