import { Children, Component, useContext, useEffect, useState } from "react";
import "./Backdrop.css";

const Backdrop = ({ animationStyle, onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="backdrop"
      style={{
        animation: animationStyle
          ? "slideUp 0.2s ease-out forwards"
          : "slideDown 0.2s ease-out forwards",
      }}
    >
      {children}
    </div>
  );
};
export default Backdrop;
