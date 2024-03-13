import { configureStore } from "@reduxjs/toolkit";
import githubReducer from "./slices/githubSlice";

const store = configureStore({
  reducer: {
    github: githubReducer,
  },
});

export default store;
