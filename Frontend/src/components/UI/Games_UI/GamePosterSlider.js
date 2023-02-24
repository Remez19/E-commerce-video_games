import { useState } from "react";
import React from "react";

import "./GamePoster.css";
import ImageSlide from "./imageSilde";

const GamePosterSlider = ({ gamesSlides }) => {
  const [gamesSlidesState, setGamesSlidesState] = useState({
    animationImage: "in",
    animationTitle: "fadeIn",
    index: 0,
  });

  // const onGamePosterClickHandler = () => {
  //   console.log(gamesSlides[gamesSlidesState.index].title);
  // };
  const onAnimationEndHandler = () => {
    // console.log("End");
    // console.log(gamesSlidesState);
    setGamesSlidesState((prevState) => {
      if (prevState.animationImage === "in") {
        return {
          animationImage: "out",
          animationTitle: "fadeOut",
          index: prevState.index,
        };
      }
      return {
        animationImage: "in",
        animationTitle: "fadeIn",
        index: (prevState.index + 1) % gamesSlides.length,
      };
    });
  };

  return (
    <section className="main_data_container__game_posters">
      <div className="game_poster__items">
        <p
          onAnimationEndCapture={onAnimationEndHandler}
          className={`game_poster_item--title ${gamesSlidesState.animationTitle}`}
        >
          {gamesSlides[gamesSlidesState.index].title}
        </p>
        <React.Suspense>
          <ImageSlide
            imageUrl={gamesSlides[gamesSlidesState.index].imageUrl}
            animation={gamesSlidesState.animationImage}
          />
        </React.Suspense>
      </div>
    </section>
  );
};

export default GamePosterSlider;
