import "./Header.css";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

import Backdrop from "../UI_Utill/Backdrop";
import HamburgerButton from "./HamburgerButton";
import MobileNav from "./MobileNav";
import UserProfile from "./UserProfile";
import Cart from "../../Cart/Cart";

const Header = () => {
  const [isHamburgerBtnClick, setIsHamburgerClick] = useState(false);
  let loggedInUser = useSelector((state) => state.ui.loggedInUser);

  const [user, setUser] = useState(null);

  const BacdropClickHandler = () => {
    setIsHamburgerClick(false);
  };
  const onHamburgerClickHandler = () => {
    setIsHamburgerClick((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, [loggedInUser]);

  // Work on styles!!!
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
          <UserProfile user={loggedInUser} />
        </li>
        <li className="main_header__item">
          <Cart />
        </li>
      </ul>
    </header>
  );
};

export default Header;
