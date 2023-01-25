import "./Loading.css";
import psPalletRed from "../../../images/UI_Images/psPallet-red.png";
import xboxYellow from "../../../images/UI_Images/xbox-logo-yellow.png";
import xboxPallet from "../../../images/UI_Images/xboxPallet.png";
import playstationYelow from "../../../images/UI_Images/playstation-logo.png";

import { useCallback, useEffect, useState } from "react";
const Loading = ({ width, height }) => {
  const getRandomPositionAndBackground = useCallback(() => {
    const backgrounds = [psPalletRed, xboxYellow, xboxPallet, playstationYelow];
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const image = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    return {
      xPos: Math.floor(Math.random() * (viewportWidth - 100)),
      yPos: Math.floor(Math.random() * (viewportHeight - 100)),
      image: image,
    };
  }, []);
  const [background, setBackground] = useState(
    getRandomPositionAndBackground()
  );
  useEffect(() => {
    setBackground(getRandomPositionAndBackground());
  }, [getRandomPositionAndBackground]);

  const onAnimationEndHandler = (event) => {
    event.target.classList.remove("fadeAnim");
    setBackground(getRandomPositionAndBackground());
    void event.target.offsetWidth;
    event.target.classList.add("fadeAnim");
  };
  return (
    <div
      className="loading-container__background"
      style={{ width: width, height: height }}
    >
      <div
        className={`loading-container fadeAnim`}
        onAnimationEnd={onAnimationEndHandler}
        style={{
          backgroundImage: `url(${background.image})`,
          backgroundSize: "3.5rem",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          left: `${background.xPos}px`,
          top: `${background.yPos}px`,
        }}
      ></div>
    </div>
  );
};

export default Loading;
