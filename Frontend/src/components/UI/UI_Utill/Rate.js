import { useState } from "react";
import React from "react";

import "./Rate.css";

function Rate({ color, size, top, left }) {
  return (
    <div
      className="five-pointed-star"
      style={{
        "--star-color": color,
        "--star-size": size,
        "--start-top": top,
        "--star-left": left,
      }}
    ></div>
  );
}

export default Rate;
