import { NavLink } from "react-router-dom";
// import { useState } from "react";

import "./UserProfile.css";

const UserProfile = () => {
  // const [active, setActive] = useState(false);

  return (
    <NavLink to="/login" className={({ isActive }) => {}} end>
      <button className={`user_profile_btn`} />
    </NavLink>
  );
};
export default UserProfile;
// ${active ? " activeLink" : ""}
