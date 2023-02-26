import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./HamburgerButton.css";

const HamburgerButton = (props) => {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  return (
    <div className="hamburger_container">
      <button onClick={props.onClick} className="main_header__toggle_button">
        <span className="toggle_button__bar_1"></span>
        <span className="toggle_button__bar_2"></span>
        <span className="toggle_button__bar_3"></span>
      </button>
      <NavLink to="/">
        <button className="main_header__logo"></button>
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "hamburger_container-main-link-active"
            : "hamburger_container-main-link"
        }
      >
        Games Puddle
      </NavLink>
      {loggedInUser && (
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? "hamburger_container-link-active"
              : "hamburger_container-link"
          }
        >
          Orders
        </NavLink>
      )}
      {loggedInUser && loggedInUser.admin && (
        <NavLink
          to="/admin/add-item"
          className={({ isActive }) =>
            isActive
              ? "hamburger_container-link-active"
              : "hamburger_container-link"
          }
        >
          Add Item
        </NavLink>
      )}
    </div>
  );
};

export default HamburgerButton;
/**
 * <NavLink to="/login" className={({ isActive }) => {}} end>
      <button className={`user_profile_btn${active ? " activeLink" : ""}`} />
    </NavLink>
 */
