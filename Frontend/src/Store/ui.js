import { createSlice } from "@reduxjs/toolkit";

const initState = {
  loggedInUser: {
    userName: localStorage.getItem("userName"),
    userId: localStorage.getItem("userId"),
    cart: [],
    favorites: [],
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initState,
  reducers: {
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const uiSliceActions = uiSlice.actions;
