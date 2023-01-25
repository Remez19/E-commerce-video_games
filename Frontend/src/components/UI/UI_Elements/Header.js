import "./Header.css";

import { useState } from "react";
import ReactDOM from "react-dom";

import Backdrop from "../UI_Utill/Backdrop";
import HamburgerButton from "./HamburgerButton";
import MobileNav from "./MobileNav";
import UserProfile from "./UserProfile";
import Cart from "../../Cart/Cart";

const Header = () => {
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
      <ul className="main_header__items">
        <li className="main_header__item">
          <UserProfile />
        </li>
        <li className="main_header__item">
          <Cart />
        </li>
      </ul>
    </header>
  );
};

export default Header;
