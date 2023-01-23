import { NavLink } from "react-router-dom";
import { Fragment } from "react";

import "./UserProfile.css";

const UserProfile = ({ user }) => {
  return (
    <Fragment>
      <NavLink to="/login" className={({ isActive }) => {}} end>
        <button className={`user_profile_btn`} />
      </NavLink>
      <p className="userName">{user}</p>
    </Fragment>
  );
};
export default UserProfile;
