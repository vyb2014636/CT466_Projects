import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./asyncAction";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    currentUser: null,
    token: null,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    startSaving: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });

    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = null;
    });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
