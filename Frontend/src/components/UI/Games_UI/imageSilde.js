import React from "react";
import "./imageSlide.css";
function ImageSlide({ imageUrl, animation }) {
  return (
    <div
      className={`game_poster__item ${animation}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    ></div>
  );
}

export default ImageSlide;
