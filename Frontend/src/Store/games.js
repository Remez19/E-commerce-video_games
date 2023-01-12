import { createSlice } from "@reduxjs/toolkit";

const initState = { games: [], slideShowGames: [] };

const gamesSlice = createSlice({
  name: "games",
  initialState: initState,
  reducers: {
    setSlideShow(state, action) {
      if (
        action.payload.games.length > 5 &&
        state.slideShowGames.length === 0
      ) {
        state.slideShowGames = [...action.payload.games.slice(0, 5)];
      }
      if (state.slideShowGames.length === 0) {
        state.slideShowGames = [...action.payload.games];
      }
    },
    setGames(state, action) {
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
