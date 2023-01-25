import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiSliceActions } from "../../../Store/ui";

import "./UserProfile.css";

const UserProfile = ({ user }) => {
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
      {user ? (
        <div className="user_profile_btn" onClick={onUserNameClickHandler}>
          {user.userName}
          <div
            className={`dropdown-menu__user-profile__backdrop ${
              active && "dropdown-menu__user-profile__backdrop-active"
            }`}
          >
            <div className={`dropdown-menu__user-profile`}>
              <h4>{user.userName}</h4>
              <ul className="dropdown-menu__user-profile__list">
                <li>
                  <button className="dropdown-menu__user-profile__list-item">
                    View Profile
                  </button>
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
        <NavLink to="/login" className={`user_profile_btn`} end>
          login
        </NavLink>
      )}
    </>
  );
};
export default UserProfile;
