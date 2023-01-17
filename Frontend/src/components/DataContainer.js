import "./DataContainer.css";
import GamePosterSlider from "./UI/Games_UI/GamePosterSlider";
import GameCatalog from "./UI/Games_UI/GameCatalog";
import Loading from "./UI/UI_Utill/Loading";
import Filter from "./UI/UI_Elements/Filter";
import SearchBar from "../components/UI/UI_Elements/SearchBar";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import { gamesSliceActions } from "../Store/games";

import useHttp from "../hooks/use-http";

const DataContainer = () => {
  // List of games to present.

  const [reqConfig, setReqConfig] = useState({
    operationType: "initGames",
    url: "http://localhost:8080/",
    headers: { "Content-Type": "application/json" },
    body: { pageNumber: 1, query: "", filter: "" },
  });

  const [filterValue, setFilterValue] = useState();

  const dispatchAction = useDispatch();

  const [operationType] = useState({
    initGames: (resData) => {
      dispatchAction(gamesSliceActions.initGames(resData));
    },
    updateGamesList: (resData) => {
      dispatchAction(gamesSliceActions.updateGamesList(resData));
    },
    setSearchResultGames: (resData) => {
      dispatchAction(gamesSliceActions.setSearchResultGames(resData));
    },
  });

  const {
    error,
    sendRequest: fetchGames,
    hasMore: hasMoreGames,
  } = useHttp(reqConfig, operationType);

  // app state loading

  const scrollEventHandler = useCallback(
    (scrollPosition) => {
      if (hasMoreGames) {
        // Do Something with scroll
        setReqConfig((prevState) => {
          return {
            ...prevState,
            body: {
              pageNumber: prevState.body.pageNumber + 1,
              query: prevState.body.query,
              filter: prevState.body.filter,
            },
            operationType: "updateGamesList",
          };
        });
      }
    },
    [hasMoreGames]
  );

  const isLoading = useSelector((state) => state.ui.isLoading);
  const gamesList = useSelector((state) => state.games.games);

  // List of games for the slide show.
  // Top games (do better quey on the db)
  const gamesSlidesList = useSelector((state) => state.games.slideShowGames);

  // console.log(scrollPosition);
  // const onSearchValueUpdate = useCallback((searchBarValue) => {
  //   setReqConfig((prevState) => {
  //     return {
  //       ...prevState,
  //       url: "http://localhost:8080/search",
  //       body: {
  //         pageNumber: 1,
  //         filter: prevState.body.filter,
  //         keyWords: searchBarValue,
  //       },
  //       operationType: "setSearchResultGames",
  //     };
  //   });
  // }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames, reqConfig]);

  const fillterUsedHandler = (filterData) => {
    dispatchAction(gamesSliceActions.clearGamesList());
    setFilterValue(filterData);
    setReqConfig((prevState) => {
      return {
        ...prevState,
        url: "http://localhost:8080/filter",
        body: { pageNumber: 1, filter: filterData },
        operationType: "updateGamesList",
      };
    });
  };
  const onSearchHandler = useCallback((keyWords) => {
    setReqConfig((prevState) => {
      return {
        ...prevState,
        url: "http://localhost:8080/search",
        body: {
          pageNumber: 1,
          filter: prevState.body.filter,
          keyWords: keyWords,
        },
        operationType: "setSearchResultGames",
      };
    });
  }, []);

  return (
    <main className="main_data_container">
      {!isLoading ? (
        <React.Fragment>
          <GamePosterSlider Slides={gamesSlidesList} />
          <div className="filter_searchBar_container">
            <div className="filter_searchBar_container__data">
              <Filter
                filterUsed={fillterUsedHandler}
                filterPicked={filterValue}
              />
              <SearchBar setUserSearch={onSearchHandler} />
            </div>
          </div>
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
