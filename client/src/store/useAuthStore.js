import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  authenticated: false,
  allUsers: [],
  authLoading: false,
  userLoading: false,
  updateUserLoading: false,
  progress: 0,
  checkAuth: async () => {
    set({ authLoading: true, authenticated:false, progress: 0 });

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const steps = [0, 35, 60, 85, 100];

    for (let value of steps) {
      await delay(1000);
      set({ progress: value });
    }

    await delay(1500);
    try {
      const res = await axios.get("/auth/getProfile");
      set({ authLoading: false, user: res.data.user, authenticated: true });
    } catch (error) {
      set({ authLoading: false, user: null, authenticated:false });
      console.error(error);
    } finally {
      set({ authLoading: false });
    }
  },

  signup: async (data) => {
    set({ userLoading: true, authenticated: false });
    try {
      const res = await axios.post("/auth/signup", data);
      set({ userLoading: false, user: res.data.user, authenticated: true });
      toast.success("Account created successfully");
    } catch (error) {
      set({ userLoading: false, user: null, authenticated:false });
      toast.error(error.response.data.error);
      console.error(error);
    }
  },

  login: async (data) => {
    set({ userLoading: true, authenticated:false });
    try {
      const res = await axios.post("/auth/login", data);
      set({ userLoading: false, user: res.data.user, authenticated: true });
      toast.success("Login successful");
    } catch (error) {
      set({ userLoading: false, user: null, authenticated:false });
      toast.error(error.response.data.error);
      console.error(error);
    }
  },

  logout: async () => {
    set({ userLoading: true });
    try {
      await axios.post("/auth/logout");
      set({ userLoading: false, user: null, allUsers: [], authenticated: false });
      toast.success("Logout successful");
    } catch (error) {
      set({ userLoading: false, user: null });
      toast.error(error.response.data.error);
      console.error(error);
    }
  },

  updateProfile: async (data) => {
    set({ updateUserLoading: true});
    try {
      const res = await axios.put("/auth/updateProfile", data);
      set({ updateUserLoading: false, user: res.data.user});
      toast.success("Profile updated successfully");
      return {success: true};
    } catch (error) {
      set({ updateUserLoading: false});
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
