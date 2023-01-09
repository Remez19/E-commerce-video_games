import "./DataContainer.css";
import GamePosterSlider from "./UI/Games_UI/GamePosterSlider";
import GameCatalog from "./UI/Games_UI/GameCatalog";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { gamesSliceActions } from "../Store/games";
import { uiSliceActions } from "../Store/ui";

const DataContainer = () => {
  // List of games to present.
  const gamesList = useSelector((state) => state.games.games);

  // List of games for the slide show.
  // Top games (do better quey on the db)
  const gamesSlidesList = useSelector((state) => state.games.slideShowGames);

  // app state loading
  // const isLoading = useSelector((state) => state.ui.isLoading);
  const isLoading = true;

  const dispatchAction = useDispatch();

  // get games from db.
  // http request to the REST API backend
  const getGames = useCallback(async () => {
    let resData;
    try {
      const res = await fetch("http://localhost:8080/", { method: "POST" });
      if (res.status !== 200) {
        throw new Error("Response not ok!");
      }
      resData = await res.json();
      dispatchAction(gamesSliceActions.initGames(resData));
      // setGamesList(resData.games);
    } catch (err) {
      // Handle error !
      console.log(err);
    }
    dispatchAction(uiSliceActions.setLoading(false));
  }, [dispatchAction]);
  useEffect(() => {
    dispatchAction(uiSliceActions.setLoading(true));
    getGames();
  }, [getGames, dispatchAction]);
  return (
    <main className="main_data_container">
      {!isLoading ? (
        <GamePosterSlider Slides={gamesSlidesList} />
      ) : (
        <p>Loading!</p>
      )}
      {!isLoading ? <GameCatalog GameList={gamesList} /> : <p>Loading!</p>}
    </main>
  );
};

export default DataContainer;
