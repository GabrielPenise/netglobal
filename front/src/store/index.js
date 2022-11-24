import { configureStore } from "@reduxjs/toolkit";
import { modalSlice, userSlice, modalSliceNew } from "./slices";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    modalCreate: modalSliceNew.reducer,
  },
});
