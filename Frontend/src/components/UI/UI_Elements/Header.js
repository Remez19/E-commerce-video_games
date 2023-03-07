import "./Header.css";

import { useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

import Backdrop from "../UI_Utill/Backdrop";
import HamburgerButton from "./HamburgerButton";
import MobileNav from "./MobileNav";
import UserProfile from "./UserProfile";
import Cart from "../../Cart/Cart";

const Header = () => {
  const user = useSelector((state) => state.ui.loggedInUser);
  const [isHamburgerBtnClick, setIsHamburgerClick] = useState(false);

  const onHamburgerClickHandler = () => {
    console.log("Remez");
    setIsHamburgerClick((prevState) => {
      return !prevState;
    });
  };
  return (
    <header className="main_header">
      <HamburgerButton onClick={onHamburgerClickHandler} />
      {isHamburgerBtnClick &&
        ReactDOM.createPortal(
          <Backdrop setIsClick={setIsHamburgerClick}>
            <MobileNav></MobileNav>
          </Backdrop>,
          document.getElementById("backdrop-root")
        )}

      <div className="main_header--user-section">
        <ul className="main_header__items">
          <li className="main_header__item">
            <UserProfile />
          </li>
          {user && (
            <li className="main_header__item">
              <Cart />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
