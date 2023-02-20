import "./GameCatalog.css";
import GameItem from "./GameItem";

import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GameCatalog = ({ handleScroll, isLoading }) => {
  const gamesList = useSelector((state) => state.games.games);
  // const gamesList = GameList;
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  let favorites = loggedInUser ? loggedInUser.favorites : undefined;
  const observer = useRef();

  const lastGameElementRef = useCallback(
    (gameElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((games) => {
        if (games[0].isIntersecting) {
          handleScroll(games[0].boundingClientRect.y);
        }
      });
      if (gameElement) {
        // console.log();
        observer.current.observe(gameElement);
      }
    },
    [isLoading, handleScroll]
  );

  const onGameItemClickHandler = (game, favorite) => {
    navigate("/game-item", { state: { game, favorite } });
  };
  return (
    <section className="game_catalog__container" onScrollCapture={handleScroll}>
      {gamesList.map((game, i) => {
        let favorite;
        if (favorites) {
          favorite = favorites.includes(game._id);
        }
        if (gamesList.length === i + 1) {
          return (
            <GameItem
              favorite={favorite}
              myRef={lastGameElementRef}
              gameData={game}
              onGameItemClick={onGameItemClickHandler}
              key={game._id}
              gameId={game._id}
            />
          );
        } else {
          return (
            <GameItem
              favorite={favorite}
              gameData={game}
              onGameItemClick={onGameItemClickHandler}
              key={game._id}
              gameId={game._id}
            />
          );
        }
      })}
    </section>
  );
};
export default GameCatalog;
