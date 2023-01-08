import { useState } from "react";
import "./GameCatalog.css";
import GameItem from "./GameItem";
import ReactDOM from "react-dom";
import GameInfo from "./GameInfo";
import Backdrop from "../UI_Utill/Backdrop";
const GameCatalog = (props) => {
  const gamesList = props.GameList;
  console.log(gamesList);

  const [isGameClicked, setIsGameClicked] = useState();
  const [animStyle, setAnimStyle] = useState(true);
  const [pressedGame, setPressedGame] = useState();

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
    <section className="game_catalog__container">
      {isGameClicked &&
        ReactDOM.createPortal(
          <Backdrop onClick={onBackdropClicked} animationStyle={animStyle}>
            <GameInfo gameData={pressedGame} onBackClick={onBackdropClicked} />
          </Backdrop>,
          document.getElementById("backdrop-root")
        )}
      {gamesList.map((game) => {
        return (
          <GameItem gameData={game} onGameItemClick={onGameItemClickHandler} />
        );
      })}
    </section>
  );
};
export default GameCatalog;
