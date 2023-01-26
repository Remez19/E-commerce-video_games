import "./Header.css";

import { useState } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Backdrop from "../UI_Utill/Backdrop";
import HamburgerButton from "./HamburgerButton";
import MobileNav from "./MobileNav";
import UserProfile from "./UserProfile";
import Cart from "../../Cart/Cart";

const Header = () => {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  const [isHamburgerBtnClick, setIsHamburgerClick] = useState(false);

  const BacdropClickHandler = () => {
    setIsHamburgerClick(false);
  };
  const onHamburgerClickHandler = () => {
    setIsHamburgerClick((prevState) => {
      return !prevState;
    });
  };
  return (
    <header className="main_header">
      <HamburgerButton onClick={onHamburgerClickHandler} />
      {isHamburgerBtnClick &&
        ReactDOM.createPortal(
          <Backdrop onClick={BacdropClickHandler} />,
          document.getElementById("backdrop-root")
        )}
      <MobileNav isHamburgerBtnClick={isHamburgerBtnClick} />
      {loggedInUser && (
        <div className="main_header--pages_routes">
          <NavLink to="/orders">Orders</NavLink>
        </div>
      )}

      <div className="main_header--user-section">
        <ul className="main_header__items">
          <li className="main_header__item">
            <UserProfile />
          </li>
          <li className="main_header__item">
            <Cart />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
