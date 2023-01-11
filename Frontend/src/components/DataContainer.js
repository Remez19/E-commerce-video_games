import "./DataContainer.css";
import GamePosterSlider from "./UI/Games_UI/GamePosterSlider";
import GameCatalog from "./UI/Games_UI/GameCatalog";
import Loading from "./UI/UI_Utill/Loading";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import { gamesSliceActions } from "../Store/games";

import useHttp from "../hooks/use-http";

const DataContainer = () => {
  // List of games to present.
  const [pageNumber, setPageNumber] = useState(1);

  const dispatchAction = useDispatch();

  const setGames = useCallback(
    (gamesList) => {
      dispatchAction(gamesSliceActions.initGames(gamesList));
    },
    [dispatchAction]
  );
  const { error, sendRequest: fetchGames } = useHttp(
    {
      url: "http://localhost:8080/",
    },
    setGames
  );

  const gamesList = useSelector((state) => state.games.games);

  // List of games for the slide show.
  // Top games (do better quey on the db)
  const gamesSlidesList = useSelector((state) => state.games.slideShowGames);

  // app state loading
  const isLoading = useSelector((state) => state.ui.isLoading);

  useEffect(() => {
    fetchGames({ page: pageNumber });
  }, [fetchGames, pageNumber]);
  return (
    <main className="main_data_container">
      {!isLoading ? (
        <React.Fragment>
          <GamePosterSlider Slides={gamesSlidesList} />
          <GameCatalog GameList={gamesList} />
        </React.Fragment>
      ) : (
        <Loading />
      )}
      {error && <p>Error Component</p>}
    </main>
  );
};

export default DataContainer;
