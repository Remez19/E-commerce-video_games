import "./GamePoster.css";

import { useState } from "react";
import { useSelector } from "react-redux";
const GamePosterSlider = () => {
  const gamesSlides = useSelector((state) => state.games.slideShowGames);
  const [gamesSlidesState, setGamesSlidesState] = useState({
    animation: "in",
    index: 0,
  });

  const onGamePosterClickHandler = () => {
    console.log(gamesSlides[gamesSlidesState.index].title);
  };
  const onAnimationEndHandler = () => {
    setGamesSlidesState((prevState) => {
      if (prevState.animation === "in") {
        return {
          animation: "out",
          index: prevState.index,
        };
      }
      return {
        animation: "in",
        index: (prevState.index + 1) % gamesSlides.length,
      };
    });
  };
  return (
    <section className="main_data_container__game_posters">
      <div className="game_poster__items">
        <p
          className={`game_poster_item--title ${
            gamesSlidesState.animation === "in" ? "fadeIn" : "fadeOut"
          }`}
        >
          {gamesSlides[gamesSlidesState.index].title}
        </p>
        <div
          onAnimationEnd={onAnimationEndHandler}
          onClick={onGamePosterClickHandler}
          className={`game_poster__item ${gamesSlidesState.animation}`}
          style={{
            backgroundImage: `url(${
              gamesSlides[gamesSlidesState.index].imageUrl
            })`,
          }}
        ></div>
      </div>
    </section>
  );
};

export default GamePosterSlider;
