import { create } from "zustand";
import axios from "axios";

export const useGetAPIStore = create((set) => ({
  loading: false,
  data: null,
  error: null,

  // Function to fetch data from the API
  fetchData: async (url = {}) => {
    console.log(url);
    set({ loading: true, data: null, error: null });
    try {
      const res = await axios.get(url);
      set({ data: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data || "Something went wrong",
        loading: false,
      });
    }
  },

  fetchBBQData: async (url = {}) => {
    console.log(url);
    set({ loading: true, data: null, error: null });
    try {
      const res = await axios.get(url);
      set({ data: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data || "Something went wrong",
        loading: false,
      });
    }
  },

  getLastBBQID: async (url = {}) => {
    console.log(url);
    set({ loading: true, data: null, error: null });
    try {
      const res = await axios.get(url);
      set({ data: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data || "Something went wrong",
        loading: false,
      });
    }
  },

  // Function to reset the store
  reset: () => set({ loading: false, data: null, error: null }),
}));
