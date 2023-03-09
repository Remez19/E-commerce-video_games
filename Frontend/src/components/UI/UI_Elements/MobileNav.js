import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./MobileNav.css";
const MobileNav = ({ anim }) => {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  return (
    <nav className="mobile_nav">
      <ul className="mobile_nav__items">
        {!loggedInUser && (
          <li className="mobile_nav__item">
            <NavLink to="/orders" className="mobile_nav__item-link">
              Login
            </NavLink>
          </li>
        )}
        {loggedInUser && (
          <li className="mobile_nav__item">
            <NavLink to="/orders" className="mobile_nav__item-link">
              Orders
            </NavLink>
          </li>
        )}
        {loggedInUser && loggedInUser.admin && (
          <li className="mobile_nav__item">
            <NavLink to="/admin/add-item" className="mobile_nav__item-link">
              Add Item
            </NavLink>
          </li>
        )}
        {/* {loggedInUser && loggedInUser.admin && (
          <li className="mobile_nav__item">
            <NavLink to="/admin/edit-items" className="mobile_nav__item-link">
              Edit Item
            </NavLink>
          </li>
        )} */}
      </ul>
    </nav>
  );
};
export default MobileNav;
