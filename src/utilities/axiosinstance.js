import { changeUserState } from "../redux/slices/Authslice";
import store from "../redux/slices/store";
import axios from "axios";
import { useDispatch } from "react-redux";


// GETTING BASE URL OF BACKEND FROM .env
export const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);


// CREATING AXIOS INSTANCE WITH ALLOWING COOKIES
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


// THIS IS LIKE MIDDLEWARE FOR FRONTEND CHECKS WHETHER USER HAS ACCESS TOKEN OR NOT
// IF NOT THEN IT REDIRECTS ON LOGIN ROUTE AND IF YES THEN ALLOWS USER TO USE RESOURCES



axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("ERROR", error);
    if (error.response?.status === 401) {
      store.dispatch(changeUserState(false)); // IN REDUX UNDER store.js REDUCERS of authSlice and in authSlice.js ALL REDUCERS ARE WRITTEN
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
