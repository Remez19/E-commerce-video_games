import "./GameCatalog.css";
import GameItem from "./GameItem";
import ReactDOM from "react-dom";
import GameInfo from "./GameInfo";
import Backdrop from "../UI_Utill/Backdrop";

import { useState, useCallback, useRef } from "react";

const GameCatalog = ({ GameList, handleScroll, isLoading }) => {
  const gamesList = GameList;
  const observer = useRef();
  const [isGameClicked, setIsGameClicked] = useState();
  const [animStyle, setAnimStyle] = useState(true);
  const [pressedGame, setPressedGame] = useState();

  // Logic for infinate scroll
  const lastGameElementRef = useCallback(
    (gameElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((games) => {
        if (games[0].isIntersecting) {
          handleScroll();
        }
      });
      if (gameElement) observer.current.observe(gameElement);
    },
    [isLoading, handleScroll]
  );

  const onGameItemClickHandler = (game) => {
    setAnimStyle(false);
    setIsGameClicked(true);
    setPressedGame(game);
  };
  const onBackdropClicked = () => {
    setAnimStyle(true);
    // Can be done better ?
    setTimeout(() => {
      setIsGameClicked(false);
    }, 210);
  };
  return (
    <section className="game_catalog__container" onScrollCapture={handleScroll}>
      {isGameClicked &&
        ReactDOM.createPortal(
          <Backdrop onClick={onBackdropClicked} animationStyle={animStyle}>
            <GameInfo gameData={pressedGame} onBackClick={onBackdropClicked} />
          </Backdrop>,
          document.getElementById("backdrop-root")
        )}
      {gamesList.map((game, i) => {
        if (gamesList.length === i + 1) {
          return (
            <GameItem
              myRef={lastGameElementRef}
              gameData={game}
              onGameItemClick={onGameItemClickHandler}
              key={game._id}
            />
          );
        } else {
          return (
            <GameItem
              gameData={game}
              onGameItemClick={onGameItemClickHandler}
              key={game._id}
            />
          );
        }
      })}
    </section>
  );
};
export default GameCatalog;
