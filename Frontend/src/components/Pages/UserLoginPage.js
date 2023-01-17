import React, { useState, Fragment } from "react";

import "./UserLoginPage.css";
import UserLogin from "../UI/USER_UI/User-Login";
import UserSignup from "../UI/USER_UI/User-Signup";

function UserLoginPage() {
  const [loginForm, setLoginForm] = useState(true);

  const onClickSignupHandler = () => {
    setLoginForm((prevState) => !prevState);
  };

  return (
    <Fragment>
      {loginForm && <UserLogin onClickSignupHandler={onClickSignupHandler} />}
      {!loginForm && <UserSignup onClickSignupHandler={onClickSignupHandler} />}
    </Fragment>
  );
}

export default UserLoginPage;
