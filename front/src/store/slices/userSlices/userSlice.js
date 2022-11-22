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
    unSet() {
      return initialState;
    },
  },
});

export const { setUser } = userSlice.actions;
