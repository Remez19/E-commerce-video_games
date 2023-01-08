import "./MobileNav.css";
const MobileNav = (props) => {
  const cssClasses = [
    "mobile_nav",
    props.isHamburgerBtnClick ? "open" : "close",
  ];
  return (
    <nav className={cssClasses.join(" ")}>
      <ul className="mobile_nav__items">
        <li className="mobile_nav__item">
          <a href="//">PS5</a>
        </li>
        <li className="mobile_nav__item">
          <a href="#">XBOX SERIES X</a>
        </li>
        <li className="mobile_nav__item">
          <a href="#">PC</a>
        </li>
      </ul>
    </nav>
  );
};
export default MobileNav;
