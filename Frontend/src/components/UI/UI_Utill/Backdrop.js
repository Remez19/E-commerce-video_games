import { useState } from "react";

import "./Backdrop.css";

const Backdrop = ({ children, setIsClick }) => {
  const [anim, setAnim] = useState("slideIn 0.2s ease-out forwards");
  const onBackClickHandler = () => {
    setAnim("slideBack 0.2s ease-out forwards");
  };

  const onAnimEndHandler = () => {
    if (anim === "slideBack 0.2s ease-out forwards") {
      setIsClick(false);
    }
  };

  return (
    <div
      onClick={onBackClickHandler}
      onAnimationEnd={onAnimEndHandler}
      className="backdrop"
      style={{
        animation: anim,
      }}
    >
      {children}
    </div>
  );
};
export default Backdrop;
