import { createSlice } from "@reduxjs/toolkit";

const githubSlice = createSlice({
  name: "github",
  initialState: {
    repositories: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchRepositoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRepositoriesSuccess: (state, action) => {
      state.repositories = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchRepositoriesFailure: (state, action) => {
      state.repositories = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRepositoriesStart,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
} = githubSlice.actions;

export default githubSlice.reducer;
