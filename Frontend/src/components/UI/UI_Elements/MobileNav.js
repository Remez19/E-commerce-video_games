import { NavLink } from "react-router-dom";

import "./MobileNav.css";
const MobileNav = ({ anim }) => {
  return (
    <nav className="mobile_nav">
      <ul className="mobile_nav__items">
        <li className="mobile_nav__item">
          <NavLink to="/orders" className="mobile_nav__item-link">
            Orders
          </NavLink>
        </li>
        <li className="mobile_nav__item">
          <NavLink to="/orders" className="mobile_nav__item-link">
            Other Page
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default MobileNav;
