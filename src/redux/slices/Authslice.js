// src/redux/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isLoggedIn: !!Cookies.get("token") ,
  justLoggedOut: false,
  studentname:"" // true if token exists, false otherwise
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeUserState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logoutUser: (state) => {
      Cookies.remove("token");           // ⛔ Clear the token from cookies
      state.isLoggedIn = false;          // 🔐 Reset login status
    },
     clearLogoutFlag: (state) => {
      state.justLoggedOut = false;
    },
    studentfullname:(state)=>{
      state.studentname= action.payload
    }

  }
});

export const { changeUserState, logoutUser } = authSlice.actions;
export default authSlice.reducer;
