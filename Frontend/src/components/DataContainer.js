import "./DataContainer.css";
import GamePosterSlider from "./UI/Games_UI/GamePosterSlider";
import GameCatalog from "./UI/Games_UI/GameCatalog";
import Loading from "./UI/UI_Utill/Loading";
import Filter from "./UI/UI_Elements/Filter";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import { gamesSliceActions } from "../Store/games";

import useHttp from "../hooks/use-http";

const DataContainer = () => {
  // List of games to present.
  const [pageNumber, setPageNumber] = useState(1);

  const dispatchAction = useDispatch();

  const setGamesList = useCallback(
    (resData) => {
      dispatchAction(gamesSliceActions.setGames(resData));
    },
    [dispatchAction]
  );
  const {
    error,
    sendRequest: fetchGames,
    hasMore: hasMoreGames,
  } = useHttp(
    {
      url: "http://localhost:8080/",
    },
    setGamesList
  );

  // app state loading

  const scrollEventHandler = useCallback(() => {
    if (hasMoreGames) {
      setPageNumber((prevState) => prevState + 1);
    }
  }, [hasMoreGames]);

  useEffect(() => {
    fetchGames({ page: pageNumber });
  }, [fetchGames, pageNumber]);

  const isLoading = useSelector((state) => state.ui.isLoading);
  const gamesList = useSelector((state) => state.games.games);

  // List of games for the slide show.
  // Top games (do better quey on the db)
  const gamesSlidesList = useSelector((state) => state.games.slideShowGames);

  return (
    <main className="main_data_container">
      {!isLoading ? (
        <React.Fragment>
          <GamePosterSlider Slides={gamesSlidesList} />
          <Filter />
          <GameCatalog
            GameList={gamesList}
            handleScroll={scrollEventHandler}
            isLoading={isLoading}
          />
        </React.Fragment>
      ) : (
        <Loading />
      )}
      {error && <p>Error Component</p>}
    </main>
  );
};

export default DataContainer;
