// import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { FaUserCircle } from "react-icons/fa";

import { uiSliceActions } from "../../../Store/ui";
import "./UserProfile.css";

const UserProfile = () => {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  const dispatchAction = useDispatch();
  const navigate = useNavigate();
  const onLogoutClickHandler = () => {
    localStorage.clear();
    dispatchAction(uiSliceActions.setLoggedInUser(undefined));
    navigate("/login");
  };
  return (
    <>
      {loggedInUser ? (
        <div className="user_profile_btn">
          <Dropdown
            role="menuitem"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Dropdown.Toggle
              as={Button}
              id="dropdown-basic"
              size="sm"
              onToggle={() => {
                console.log("ffdf");
              }}
              style={{
                backgroundColor: "#ff7474",
                borderColor: "#ff7474",
                display: "flex",
                flexDirection: "column",
                borderRadius: "50%",
                height: "2rem",
                width: "2rem",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                textAlign: "start",
              }}
            >
              <FaUserCircle
                size={"2rem"}
                color={"black"}
                strokeWidth={"1px"}
              ></FaUserCircle>
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.ItemText
                style={{ textAlign: "center", color: "#ff7474" }}
              >
                {loggedInUser.userName}
              </Dropdown.ItemText>
              <Dropdown.Item
                href="/user-profile"
                style={{ textAlign: "center", color: "#ff7474" }}
              >
                View Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={onLogoutClickHandler}
                style={{ textAlign: "center", color: "#ff7474" }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
            <p style={{ margin: 0 }}>{loggedInUser.userName}</p>
          </Dropdown>
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
/**
 * <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
 */
/* <div
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
          </div> */
