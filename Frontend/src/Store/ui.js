import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isLoading: true,
  elementToscroll: null,
  reqConfig: {
    operationType: "initGames",
    url: "http://localhost:8080/",
    headers: { "Content-Type": "application/json" },
    body: { pageNumber: 1, query: "", filter: "" },
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setReqConfig(state, action) {
      state.reqConfig = action.payload;
    },
    setElementToScroll(state, action) {
      state.elementToscroll = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const uiSliceActions = uiSlice.actions;
