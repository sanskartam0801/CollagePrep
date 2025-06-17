import { create } from 'zustand';

const useFormStore = create((set) => ({
  course: '',
  semester: '',
  branch: '',
  subject: '',
  formFilled: false,
  errorMessage: '',

  setCourse: (course) => set({ course }),
  setSemester: (semester) => set({ semester }),
  setBranch: (branch) => set({ branch }),
  setSubject: (subject) => set({ subject }),
  setFormFilled: (formFilled) => set({ formFilled }),
  setError: (errorMessage) => set({ errorMessage }),
  clearError: () => set({ errorMessage: '' }),
}));

export default useFormStore;
