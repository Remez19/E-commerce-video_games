import { configureStore } from "@reduxjs/toolkit";
import gameSliceReducer from "./games";
import uiSliceReducer from "./ui";

const store = configureStore({
  reducer: {
    games: gameSliceReducer,
    ui: uiSliceReducer,
  },
});

export default store;
