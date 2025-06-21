import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFormStore = create(
  persist(
    (set) => ({
      year: "",
      semester: "",
      branch: "",
      subject: "",
      formFilled: false,
      errorMessage: null,

      setYear: (year) => set({ year }),
      setSemester: (semester) => set({ semester }),
      setBranch: (branch) => set({ branch }),
      setSubject: (subject) => set({ subject }),
      setFormFilled: (status) => set({ formFilled: status }),
      setError: (message) => set({ errorMessage: message }),
      clearError: () => set({ errorMessage: null }),


      resetForm: () =>
        set({
          year: "",
          semester: "",
          branch: "",
          subject: "",
          formFilled:false
          
        }),
  
    }),
    {
      name: "form-storage", // localStorage key
    }
  )
);

export default useFormStore;
