import { configureStore } from "@reduxjs/toolkit";
import { modalSlice, userSlice } from "./slices";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
  },
});
