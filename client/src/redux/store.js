import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import themeModeSlice from "./features/themeModeSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    themeMode: themeModeSlice.reducer,
    authModal: authModalSlice.reducer,
    globalLoading: globalLoadingSlice.reducer,
    appState: appStateSlice.reducer,
  },
});

export default store;
