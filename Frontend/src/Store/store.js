import { configureStore } from "@reduxjs/toolkit";
import gameSliceReducer from "./games";

const store = configureStore({
  reducer: {
    games: gameSliceReducer,
  },
});

export default store;
