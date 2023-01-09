import "./DataContainer.css";
import GamePosterSlider from "./UI/Games_UI/GamePosterSlider";
import GameCatalog from "./UI/Games_UI/GameCatalog";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gamesSliceActions } from "../Store/games";

const DataContainer = () => {
  const gamesList = useSelector((state) => state.games.games);
  const gamesSlidesList = useSelector((state) => state.games.slideShowGames);
  const [isLoading, setIsLoading] = useState(true);
  const dispatchAction = useDispatch();
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
    setIsLoading(false);
  }, [dispatchAction]);
  useEffect(() => {
    setIsLoading(true);
    getGames();
  }, [getGames]);
  return (
    <main className="main_data_container">
      {!isLoading ? (
        <GamePosterSlider GameList={gamesSlidesList} />
      ) : (
        <p>Loading!</p>
      )}
      {/* {!isLoading ? <GamePosterSlider GameList={gamesList} /> : <p>Loading</p>} */}
      {!isLoading ? <GameCatalog GameList={gamesList} /> : <p>Loading!</p>}
    </main>
  );
};

export default DataContainer;
