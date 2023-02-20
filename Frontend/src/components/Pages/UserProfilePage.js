import { FaUser, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

import "./UserProfilePage.css";

function UserProfilePage() {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  return (
    <main className="user-profile-page__container">
      <FaUser
        size={"8rem"}
        style={{
          marginTop: "2rem",
          border: "2px solid #ffa6a6",
          borderRadius: "50%",
          padding: "0.5rem",
        }}
        color={"#ff7474"}
      />
      <p
        style={{
          color: "#ff7474",
          textDecoration: "underline",
          fontWeight: "bold",
          margin: "0",
        }}
      >
        {loggedInUser.userName}
      </p>
      <div className="user-profile-page--data-container">
        <div className="user-profile-page--data-field">
          <label
            style={{ color: "#ffe283", borderBottom: "2px solid #ffe283" }}
          >
            User Name:
          </label>
          <lable style={{ color: "#ff7474" }}>{loggedInUser.userName}</lable>
        </div>
        <div className="user-profile-page--data-field">
          <label
            style={{ color: "#ffe283", borderBottom: "2px solid #ffe283" }}
          >
            Email:
          </label>
          <lable style={{ color: "#ff7474" }}>{loggedInUser.userEmail}</lable>
        </div>
      </div>
    </main>
  );
}

export default UserProfilePage;
