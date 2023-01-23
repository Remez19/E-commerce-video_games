import { createSlice } from "@reduxjs/toolkit";

const initState = {
  loggedInUser: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initState,
  reducers: {
    setLoggedInUserName(state, action) {
      state.loggedInUser = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const uiSliceActions = uiSlice.actions;
