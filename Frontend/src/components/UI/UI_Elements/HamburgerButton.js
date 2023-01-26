import { NavLink, useNavigate } from "react-router-dom";

import "./HamburgerButton.css";

const HamburgerButton = (props) => {
  const navigate = useNavigate();

  const onHomePageNameClickHandler = () => {
    navigate("/");
  };
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
      <p onClick={onHomePageNameClickHandler}>Games Puddle</p>
    </div>
  );
};

export default HamburgerButton;
/**
 * <NavLink to="/login" className={({ isActive }) => {}} end>
      <button className={`user_profile_btn${active ? " activeLink" : ""}`} />
    </NavLink>
 */
