import axios from "axios";
import { getAuth } from "firebase/auth";

// ✅ 1. Get backend base URL from env
export const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("Backend URL:", BASE_URL);

// ✅ 2. Create Axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ✅ 3. Request interceptor only (no global response handling)
axiosInstance.interceptors.request.use(
  async (config) => {
    const user = getAuth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // pass error to caller
  }
);

// ❌ NO response interceptor here (no global 401 handling)
