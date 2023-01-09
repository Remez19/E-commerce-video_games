import { createSlice } from "@reduxjs/toolkit";

const initState = { games: [], slideShowGames: [] };

const gamesSlice = createSlice({
  name: "games",
  initialState: initState,
  reducers: {
    initGames(state, action) {
      state.slideShowGames = [...action.payload.games];
      state.games = [...action.payload.games];
    },
    setSearchResultGames(state, action) {
      state.games = [...action.payload.games];
    },
  },
});

export default gamesSlice.reducer;
export const gamesSliceActions = gamesSlice.actions;