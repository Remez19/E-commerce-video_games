import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const uiSliceActions = uiSlice.actions;
