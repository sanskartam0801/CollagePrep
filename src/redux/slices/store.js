import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Authslice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export default store;
