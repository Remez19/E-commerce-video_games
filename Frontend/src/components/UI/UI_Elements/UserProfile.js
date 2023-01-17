import { Fragment, useState } from "react";
import ReactDOM from "react-dom";

import "./UserProfile.css";
import Backdrop from "../UI_Utill/Backdrop";

const UserProfile = () => {
  const [isUserProfilecCicked, setIsUserProfileClicked] = useState(false);
  const [animation, setAnimation] = useState(
    "slideDown 0.2s ease-out forwards"
  );

  return (
    <Fragment>
      {isUserProfilecCicked &&
        ReactDOM.createPortal(
          <Backdrop
            setIsItemClicked={setIsUserProfileClicked}
            anim={animation}
            setAnim={setAnimation}
          ></Backdrop>,
          document.getElementById("backdrop-root")
        )}
      <button className={"user_profile_btn"}></button>
    </Fragment>
  );
};
export default UserProfile;
// {isGameClicked &&
//   ReactDOM.createPortal(
//     <Backdrop
//       setIsItemClicked={setIsGameClicked}
//       anim={animation}
//       setAnim={setAnimation}
//     >
//       <GameInfo
//         gameData={pressedGame}
//         onBackClick={() => {
//           setAnimation("slideUp 0.2s ease-out forwards");
//         }}
//       />
//     </Backdrop>,
//     document.getElementById("backdrop-root")
//   )}
