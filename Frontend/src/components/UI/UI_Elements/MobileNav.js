import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./MobileNav.css";
const MobileNav = ({ anim }) => {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  return (
    <nav className="mobile_nav">
      <ul className="mobile_nav__items">
        <li className="mobile_nav__item">
          <NavLink to="/orders" className="mobile_nav__item-link">
            Orders
          </NavLink>
        </li>
        {loggedInUser.admin && (
          <li className="mobile_nav__item">
            <NavLink to="/admin/add-item" className="mobile_nav__item-link">
              Add Item
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default MobileNav;
