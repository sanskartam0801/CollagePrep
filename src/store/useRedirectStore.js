// store/useRedirectStore.js
import { create } from "zustand";

const useRedirectStore = create((set) => ({
  message: "",
  setMessage: (msg) => set({ message: msg }),
  clearMessage: () => set({ message: "" }),
}));

export default useRedirectStore;
