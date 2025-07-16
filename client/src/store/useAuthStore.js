import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  allUsers: [],
  authLoading: false,
  userLoading: false,
  progress: 0,

  checkAuth: async () => {
    set({ authLoading: true, progress: 0 });

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const steps = [0, 20, 40, 60, 80, 100];

    for (let value of steps) {
      await delay(1500);
      set({ progress: value });
    }

    await delay(1500);
    try {
      const res = await axios.get("/auth/getProfile");
      set({ authLoading: false, user: res.data.user });
    } catch (error) {
      set({ authLoading: false, user: null });
      console.error(error);
    } finally {
      set({ authLoading: false });
    }
  },

  signup: async (data) => {
    set({ userLoading: true });
    try {
      const res = await axios.post("/auth/signup", data);
      set({ userLoading: false, user: res.data.user });
      toast.success("Account created successfully");
    } catch (error) {
      set({ userLoading: false, user: null });
      toast.error(error.response.data.error);
      console.error(error);
    }
  },

  login: async (data) => {
    set({ userLoading: true });
    try {
      const res = await axios.post("/auth/login", data);
      set({ userLoading: false, user: res.data.user });
      toast.success("Login successful");
    } catch (error) {
      set({ userLoading: false, user: null });
      toast.error(error.response.data.error);
      console.error(error);
    }
  },

  logout: async () => {
    set({ userLoading: true });
    try {
      await axios.post("/auth/logout");
      set({ userLoading: false, user: null });
      toast.success("Logout successful");
    } catch (error) {
      set({ userLoading: false, user: null });
      toast.error(error.response.data.error);
      console.error(error);
    }
  },

  updateProfile: async (data) => {
    set({ userLoading: true });
    try {
      const res = await axios.put("/auth/updateProfile", data);
      set({ userLoading: false, user: res.data.user });
      toast.success("Profile updated successfully");
    } catch (error) {
      set({ userLoading: false, user: null });
      toast.error(error.response.data.error);
      console.error(error);
    }
  },

  getAllUsers: async () => {
    try {
      const res = await axios.get("/auth/allUsers");
      set({ allUsers: res.data.users });
    } catch (error) {
      set({ allUsers: [] });
      console.error(error);
    }
  },
}));
