// src/redux/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isLoggedIn: false,
  justLoggedOut: false,
  studentName: "",
  studentImage: "",   // 🔹 NEW: store photoURL here
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeUserState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logoutUser: (state) => {
      Cookies.remove("token");
      state.isLoggedIn = false;
    },
    clearLogoutFlag: (state) => {
      state.justLoggedOut = false;
    },
    setStudentName: (state, action) => {
      state.studentName = action.payload;
    },
    setStudentImage: (state, action) => {
      state.studentImage = action.payload;
    },
  },
});

export const {
  changeUserState,
  logoutUser,
  clearLogoutFlag,
  setStudentName,
  setStudentImage,  // 🔹 Export the new action
} = authSlice.actions;

export default authSlice.reducer;
