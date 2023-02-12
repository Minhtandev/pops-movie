import { createSlice } from "@reduxjs/toolkit";

const appStateSlice = createSlice({
  name: "AppState",
  initialState: {
    appState: "",
  },
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
      //redux toolkit có IMMER cho phép sử dụng mutation nhưng thực ra là immutation
    },
  },
});

export default appStateSlice;
export const { setAppState } = appStateSlice.actions;
