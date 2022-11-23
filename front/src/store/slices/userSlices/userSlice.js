import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    unSet(state) {
      state.user = null;
    },
  },
});

export const { setUser, unSet } = userSlice.actions;
