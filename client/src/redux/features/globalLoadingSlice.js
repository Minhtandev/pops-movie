import { createSlice } from "@reduxjs/toolkit";

const globalLoadingSlice = createSlice({
  name: "GlobalLoading",
  initialState: {
    globalLoading: true,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice;
