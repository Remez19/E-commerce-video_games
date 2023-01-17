import "./UserProfile.css";
import { Fragment, useState } from "react";
import ReactDOM from "react-dom";

const UserProfile = () => {
  const [isUserProfilecCicked, setIsUserProfileClicked] = useState(false);
  const onBackdropClicked = () => {
    setIsUserProfileClicked(false);
  };
  return (
    <Fragment>
      {/* {isUserProfilecCicked &&
        ReactDOM.createPortal(
         ,
          document.getElementById("backdrop-root")
        )} */}
      <button className={"user_profile_btn"}></button>
    </Fragment>
  );
};
export default UserProfile;
// {isGameClicked &&
//   ReactDOM.createPortal(
// (
//   <Backdrop onClick={onBackdropClicked} animationStyle={animStyle}>
//     <GameInfo gameData={pressedGame} onBackClick={onBackdropClicked} />
//   </Backdrop>
// ),
//   document.getElementById("backdrop-root");
//   )}
