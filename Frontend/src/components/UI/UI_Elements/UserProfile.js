import { NavLink } from "react-router-dom";

import "./UserProfile.css";

const UserProfile = ({ user }) => {
  return (
    <NavLink to="/login" className={`user_profile_btn`} end>
      {user ? user : "login"}
    </NavLink>
  );
};
export default UserProfile;
