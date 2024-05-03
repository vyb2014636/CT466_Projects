import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./asyncAction";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    currentUser: null,
    token: null,
    isLoading: false,
    currentCart: [],
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
    updateCart: (state, action) => {
      const { pid, color, quantity } = action.payload;
      const updatingCart = JSON.parse(JSON.stringify(state.currentCart));
      state.currentCart = updatingCart.map((el) => {
        if (el.color === color && el.product?._id === pid) return { ...el, quantity };
        else return el;
      });
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
      state.currentCart = action.payload.cart;
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

export const { login, logout, clearMessage, updateCart } = userSlice.actions;
export default userSlice.reducer;
