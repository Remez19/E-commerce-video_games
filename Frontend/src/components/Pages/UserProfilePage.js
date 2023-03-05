import { FaUser } from "react-icons/fa";
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
          <p style={{ color: "#ffe283", textDecoration: "underline" }}>
            User Name:
          </p>
          <p style={{ color: "#ff7474" }}>{loggedInUser.userName}</p>
        </div>
        <div className="user-profile-page--data-field">
          <p style={{ color: "#ffe283", textDecoration: "underline" }}>
            Email:
          </p>
          <p style={{ color: "#ff7474" }}>{loggedInUser.userEmail}</p>
        </div>
      </div>
    </main>
  );
}

export default UserProfilePage;
