import { useRef, useState } from "react";

import "./User-Login.css";

/**
 * Missing input valdiation.
 */

function UserSignup({ onClickSignupHandler }) {
  const [userData, setUserData] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
    rePassword: undefined,
  });
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const rePassword = useRef();
  const [invalidInput, setInvalidInput] = useState(true);
  const [reqConfig, setReqConfig] = useState({
    url: "http://localhost:8080/login",
    headers: { "Content-Type": "application/json" },
    body: { email: "", password: "", userName: "" },
  });

  const onSignupHandler = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  const onFocusHandler = (e) => {
    if (e.target.id === "userName")
      setUserData((prevState) => {
        return { ...prevState, userName: "moveUp" };
      });
    if (e.target.id === "Email")
      setUserData((prevState) => {
        return { ...prevState, email: "moveUp" };
      });
    else if (e.target.id === "Password")
      setUserData((prevState) => {
        return { ...prevState, password: "moveUp" };
      });
    else if (e.target.id === "rePassword")
      setUserData((prevState) => {
        return { ...prevState, rePassword: "moveUp" };
      });
  };
  const onBlurHandler = (e) => {
    if (e.target.id === "userName" && userName.current.value === "")
      setUserData((prevState) => {
        return { ...prevState, userName: "moveDown" };
      });
    else if (e.target.id === "Email" && email.current.value === "")
      setUserData((prevState) => {
        return { ...prevState, email: "moveDown" };
      });
    else if (e.target.id === "Password" && password.current.value === "")
      setUserData((prevState) => {
        return { ...prevState, password: "moveDown" };
      });
    else if (e.target.id === "rePassword" && rePassword.current.value === "")
      setUserData((prevState) => {
        return { ...prevState, rePassword: "moveDown" };
      });
  };

  const onChangeHandler = (e) => {
    setReqConfig((prevState) => {
      return {
        ...prevState,
        body: {
          email: email.current ? email.current.value : prevState.body.email,
          password: password.current
            ? password.current.value
            : prevState.body.password,
        },
      };
    });
    if (email.current.value !== "" && password.current.value !== "") {
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
    }
  };

  return (
    <form onSubmit={onSignupHandler} className="user-login__container">
      <div className="user-signup__header-img"></div>
      <div className="user-login__data">
        <input
          id="userName"
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          ref={userName}
          onChange={onChangeHandler}
        ></input>
        <label
          htmlFor="userName"
          className={userData.userName ? userData.userName : ""}
        >
          User Name
        </label>
        <input
          id="Email"
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          ref={email}
          onChange={onChangeHandler}
        ></input>
        <label
          htmlFor="email-signup"
          className={userData.email ? userData.email : ""}
        >
          Email
        </label>
        <input
          onChange={onChangeHandler}
          id="Password"
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          ref={password}
          type={"password"}
        ></input>
        <label
          htmlFor="password-signup"
          className={userData.password ? userData.password : ""}
        >
          Password
        </label>
        <input
          onChange={onChangeHandler}
          id="rePassword"
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          ref={rePassword}
          type={"password"}
        ></input>
        <label
          htmlFor="rePassword"
          className={userData.rePassword ? userData.rePassword : ""}
        >
          Re-Enter Password
        </label>
      </div>
      <button type="submit" disabled>
        Sign-Up
      </button>
      <div className="link">
        Have an acoount already?{" "}
        <p onClick={onClickSignupHandler}>Click Here</p>
      </div>
    </form>
  );
}

export default UserSignup;
