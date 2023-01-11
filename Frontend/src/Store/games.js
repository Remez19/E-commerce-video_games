import { createSlice } from "@reduxjs/toolkit";

const initState = { games: [], slideShowGames: [] };

const gamesSlice = createSlice({
  name: "games",
  initialState: initState,
  reducers: {
    setGames(state, action) {
      state.slideShowGames = [...action.payload.games];
      state.games = state.games.concat([...action.payload.games]);
    },
    setSearchResultGames(state, action) {
      state.games = [...action.payload.games];
    },
    updateGamesList(state, action) {
      state.games = state.games.concat([...action.payload.games]);
    },
  },
});

export default gamesSlice.reducer;
export const gamesSliceActions = gamesSlice.actions;
