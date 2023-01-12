import { createSlice } from "@reduxjs/toolkit";

const initState = { isLoading: true, elementToscroll: null };

const uiSlice = createSlice({
  name: "ui",
  initialState: initState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setElementToScroll(state, action) {
      state.elementToscroll = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const uiSliceActions = uiSlice.actions;
