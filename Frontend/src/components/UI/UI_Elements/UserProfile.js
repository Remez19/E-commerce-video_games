import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceActions } from "../../../Store/ui";
import { FaUserCircle } from "react-icons/fa";

import "./UserProfile.css";

const UserProfile = () => {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  const [active, setActive] = useState(false);
  const dispatchAction = useDispatch();
  const navigate = useNavigate();
  const onUserNameClickHandler = (e) => {
    setActive((prevState) => !prevState);
  };
  const onLogoutClickHandler = () => {
    localStorage.clear();
    dispatchAction(uiSliceActions.setLoggedInUser(undefined));
    navigate("/login");
  };
  return (
    <>
      {loggedInUser ? (
        <div className="user_profile_btn" onClick={onUserNameClickHandler}>
          <FaUserCircle
            size={"2rem"}
            color={"black"}
            strokeWidth={"1px"}
            style={{ padding: "0.1rem" }}
          ></FaUserCircle>
          {loggedInUser.userName}
          <div
            className={`dropdown-menu__user-profile__backdrop ${
              active && "dropdown-menu__user-profile__backdrop-active"
            }`}
          >
            <div className={`dropdown-menu__user-profile`}>
              <h4 style={{ marginTop: "0" }}>{loggedInUser.userName}</h4>
              <ul className="dropdown-menu__user-profile__list">
                <li>
                  <NavLink
                    to="/user-profile"
                    className="dropdown-menu__user-profile__list-item"
                  >
                    View Profile
                  </NavLink>
                </li>
                <hr />
                <li>
                  <button
                    className="dropdown-menu__user-profile__list-item"
                    onClick={onLogoutClickHandler}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <NavLink to="/login" className="user_profile_btn" end>
          <FaUserCircle
            size={"2rem"}
            color={"black"}
            strokeWidth={"1px"}
            style={{ padding: "0.1rem" }}
          ></FaUserCircle>
          login
        </NavLink>
      )}
    </>
  );
};
export default UserProfile;
