import { createSlice } from "@reduxjs/toolkit";

const favorites =
  localStorage.getItem("favorites") !== undefined
    ? JSON.parse(localStorage.getItem("favorites"))
    : undefined;
const cart =
  localStorage.getItem("cart") !== undefined
    ? JSON.parse(localStorage.getItem("cart"))
    : undefined;

// console.log(cart);

const initState = {
  loggedInUser: localStorage.getItem("token")
    ? {
        userName: localStorage.getItem("userName"),
        userEmail: localStorage.getItem("userEmail"),
        cart: cart
          ? cart
          : {
              items: [],
              totalPrice: 0,
            },
        favorites: favorites ? favorites : [],
      }
    : undefined,
  admin: localStorage.getItem("admin"),
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
    updateUserFavorites(state, action) {
      if (state.loggedInUser.favorites.length > 0) {
        state.loggedInUser = {
          ...state.loggedInUser,
          favorites: [...action.payload],
        };
      } else {
        state.loggedInUser = {
          ...state.loggedInUser,
          favorites: [action.payload],
        };
      }
    },
  },
});

export default uiSlice.reducer;
export const uiSliceActions = uiSlice.actions;
