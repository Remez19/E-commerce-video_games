// import { useState } from "react";
import "./Backdrop.css";

const Backdrop = ({ children, setIsItemClicked, anim, setAnim }) => {
  const onBackClickHandler = () => {
    setAnim("slideUp 0.2s ease-out forwards");
  };
  const onAnimationEndHandler = () => {
    if (anim === "slideUp 0.2s ease-out forwards") {
      setAnim("slideDown 0.2s ease-out forwards");
      setIsItemClicked(false);
    }
  };
  // useEffect(() => {
  //   if (anim === "slideUp 0.2s ease-out forwards") {
  //     setAnimation("slideUp 0.2s ease-out forwards");
  //   }
  // }, [anim]);
  return (
    <div
      onClick={onBackClickHandler}
      onAnimationEnd={onAnimationEndHandler}
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

/**
 * ? "slideUp 0.2s ease-out forwards"
          : "slideDown 0.2s ease-out forwards",
 */
