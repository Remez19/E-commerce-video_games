import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./GamesStorePage.css";
import GamePosterSlider from "../UI/Games_UI/GamePosterSlider";
import GameCatalog from "../UI/Games_UI/GameCatalog";
import Loading from "../UI/UI_Utill/Loading";
import Filter from "../UI/UI_Elements/Filter";
import SearchBar from "../UI/UI_Elements/SearchBar";
import { gamesSliceActions } from "../../Store/games";

import useHttp from "../../hooks/use-http";

// Need to work on this component.
// fetching data can be done differently.

const GamesStore = () => {
  // List of games to present.
  const [reqConfig, setReqConfig] = useState({
    operationType: "initGames",
    url: `${process.env.REACT_APP_Backend}/`,
    body: { pageNumber: 1, query: "", filter: "" },
  });
  const [searchBarInput, setSearchBarInput] = useState();

  const dispatchAction = useDispatch();

  const [operationType] = useState({
    initGames: async (resData) => {
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
    isLoading,
  } = useHttp(reqConfig, operationType, true);

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

  useEffect(() => {
    if (error) {
      throw error;
    }
    fetchGames();
  }, [fetchGames, reqConfig, error]);

  const fillterUsedHandler = (filterData) => {
    dispatchAction(gamesSliceActions.clearGamesList());
    setReqConfig((prevState) => {
      return {
        ...prevState,
        url: `${process.env.REACT_APP_Backend}/filter`,
        body: { pageNumber: 1, filter: filterData },
        operationType: "updateGamesList",
      };
    });
  };
  const onSearchHandler = useCallback((keyWords) => {
    setSearchBarInput(keyWords);
    setReqConfig((prevState) => {
      return {
        ...prevState,
        url: `${process.env.REACT_APP_Backend}/search`,
        body: {
          pageNumber: 1,
          filter: prevState.body.filter,
          keyWords: keyWords,
        },
        operationType: "setSearchResultGames",
      };
    });
  }, []);

  const gamesList = useSelector((state) => state.games.games);
  const gamesSlides = useSelector((state) => state.games.slideShowGames);
  return (
    <main className="main_data_container">
      {!isLoading ? (
        <>
          <GamePosterSlider gamesSlides={gamesSlides} />

          <div className="filter_searchBar_container__data">
            <Filter filterUsed={fillterUsedHandler} />
            <SearchBar
              searchBarInput={searchBarInput}
              setUserSearch={onSearchHandler}
            />
          </div>
          <GameCatalog
            GameList={gamesList}
            handleScroll={scrollEventHandler}
            isLoading={isLoading}
          />
        </>
      ) : (
        <Loading width={"100vw"} height={"100vh"} />
      )}
      {error && <p>Error Component</p>}
    </main>
  );
};

export default GamesStore;
