import { NavLink } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <ul>
        <li>
          <NavLink to={"/contact"} className="footer-link">
            Contact
          </NavLink>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
