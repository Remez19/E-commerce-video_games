import "./GamePoster.css";

import { useEffect, useState } from "react";
const GamePosterSlider = (props) => {
  const [gameSlideIndex, setGameSlideIndex] = useState({
    index: 0,
    animation: "",
    fade: "",
  });
  const gamesSlides = props.GamesPosters;
  useEffect(() => {
    const intervalAnimation = setInterval(() => {
      setGameSlideIndex((currIndexVal) => {
        if (currIndexVal.animation === "out" || "")
          return {
            index: (currIndexVal.index + 1) % gamesSlides.length,
            animation: "in",
            fade: "fadeIn",
          };
        else {
          return {
            index: currIndexVal.index,
            animation: "out",
            fade: "fadeOutAnim",
          };
        }
      });
    }, 2200);
    return () => {
      clearInterval(intervalAnimation);
      // clearInterval(indexInterval);
    };
  }, [gamesSlides]);

  const onGamePosterClickHandler = () => {
    console.log(gamesSlides[gameSlideIndex.index].title);
  };

  return (
    <section className="main_data_container__game_posters">
      <div className={`game_poster__items ${gameSlideIndex.fade}`}>
        {gamesSlides[gameSlideIndex.index].title}
        <div
          onClick={onGamePosterClickHandler}
          className={`game_poster__item ${gameSlideIndex.animation}`}
          style={{
            backgroundImage: `url(${gamesSlides[gameSlideIndex.index].url})`,
          }}
        ></div>
      </div>
    </section>
  );
};

export default GamePosterSlider;