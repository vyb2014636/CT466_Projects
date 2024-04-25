import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./asyncAction";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    currentUser: null,
    token: null,
    isLoading: false,
    mes: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.currentUser = null;
      state.mes = "";
      state.isLoading = false;
    },
    clearMessage: (state, action) => {
      state.mes = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    });

    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = null;
      state.isLoggedIn = false;
      state.token = null;
      state.mes = "Phiên đăng nhập đã hết hạn";
    });
  },
});

export const { login, logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;
