import { createSlice } from "@reduxjs/toolkit";

const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : undefined;

const initState = {
  loggedInUser: localStorage.getItem("token")
    ? {
        userName: localStorage.getItem("userName"),
        userId: localStorage.getItem("userId"),
        cart: cart
          ? cart
          : {
              items: [],
              totalPrice: 0,
            },
        favorites: [],
      }
    : undefined,
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initState,
  reducers: {
    setLoggedInUser(state, action) {
      if (!action.payload) {
        state.loggedInUser = undefined;
      } else {
        state.loggedInUser = { ...action.payload };
      }
    },
    updateUserCart(state, action) {
      state.loggedInUser = {
        ...state.loggedInUser,
        cart: { ...action.payload },
      };
    },
  },
});

export default uiSlice.reducer;
export const uiSliceActions = uiSlice.actions;
