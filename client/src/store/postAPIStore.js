import { create } from "zustand";
import axios from "axios";
import { API_URL_BBQ } from "../config/config";

export const usePostAPIStore = create((set) => ({
  loading: false,
  response: null,
  error: null,

  // Function to post data to the API
  postData: async (url, data) => {
    console.log(`${API_URL_BBQ}/${url}`, data);
    set({ loading: true, response: null, error: null });
    try {
      const res = await axios.post(`${API_URL_BBQ}/${url}`, data);
      set({ response: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data || "Something went wrong",
        loading: false,
      });
    }
  },

  // Function to reset the store
  reset: () => set({ loading: false, response: null, error: null }),
}));
