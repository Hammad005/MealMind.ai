import axios from "@/lib/axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    allUsers: [],
    authLoading: false,
    userLoading: false,

    checkAuth: async () => {
        set({ authLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
            const res = await axios.get("/auth/getProfile");
        set({ authLoading: false, user: res.data.user });
        } catch (error) {
            set({ authLoading: false, user: null });
            console.error(error);   
        }
    },

    signup: async (data) => {
        set({ userLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const res = await axios.post("/auth/signup", data);
            set({ userLoading: false, user: res.data.user });
        } catch (error) {
            set({ userLoading: false, user: null });
            console.error(error);
        }
    },

    login: async (data) => {
        set({ userLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const res = await axios.post("/auth/login", data);
            set({ userLoading: false, user: res.data.user });
        } catch (error) {
            set({ userLoading: false, user: null });
            console.error(error);
        }
    },

    logout: async () => {
        set({ userLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            await axios.post("/auth/logout");
            set({ userLoading: false, user: null });
        } catch (error) {
            set({ userLoading: false, user: null });
            console.error(error);
        }
    },

    updateProfile: async (data) => {
        set({ userLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const res = await axios.put("/auth/updateProfile", data);
            set({ userLoading: false, user: res.data.user });
        } catch (error) {
            set({ userLoading: false, user: null });
            console.error(error);
        }
    },

    getAllUsers: async () => {
        set({ userLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const res = await axios.get("/auth/allUsers");
            set({ userLoading: false, allUsers: res.data.users });
        } catch (error) {
            set({ userLoading: false, allUsers: [] });
            console.error(error);
        }
    },
}));