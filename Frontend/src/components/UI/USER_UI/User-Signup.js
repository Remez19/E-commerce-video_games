import { useRef, useState } from "react";

import "./User-Login.css";

function UserSignup({ onClickSignupHandler }) {
  const [userData, setUserData] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
    rePassword: undefined,
  });
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const onSubmitHandler = (e) => {
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
    if (e.target.id === "userName" && userNameRef.current.value === "")
      setUserData((prevState) => {
        return { ...prevState, userName: "moveDown" };
      });
    if (e.target.id === "Email" && emailRef.current.value === "")
      setUserData((prevState) => {
        return { ...prevState, email: "moveDown" };
      });
    else if (e.target.id === "Password" && passwordRef.current.value === "")
      setUserData((prevState) => {
        return { ...prevState, password: "moveDown" };
      });
    else if (e.target.id === "rePassword" && rePasswordRef.current.value === "")
      setUserData((prevState) => {
        return { ...prevState, rePassword: "moveDown" };
      });
  };
  return (
    <form onSubmit={onSubmitHandler} className="user-login__container">
      <div className="user-signup__header-img"></div>
      <div className="user-login__data">
        <input
          id="userName"
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          ref={userNameRef}
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
          ref={emailRef}
        ></input>
        <label
          htmlFor="email-signup"
          className={userData.email ? userData.email : ""}
        >
          Email
        </label>
        <input
          id="Password"
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          ref={passwordRef}
          type={"password"}
        ></input>
        <label
          htmlFor="password-signup"
          className={userData.password ? userData.password : ""}
        >
          Password
        </label>
        <input
          id="rePassword"
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          ref={rePasswordRef}
          type={"password"}
        ></input>
        <label
          htmlFor="rePassword"
          className={userData.rePassword ? userData.rePassword : ""}
        >
          Re-Enter Password
        </label>
      </div>
      <button type="submit">Sign-Up</button>
      <div className="link">
        Have an acoount already?{" "}
        <p onClick={onClickSignupHandler}>Click Here</p>
      </div>
    </form>
  );
}

export default UserSignup;
/**
 *  <form onSubmit={onSubmitHandler} className="user-login__container">
      <p className="user-login__header-text">Login</p>
      <div className="user-login__data">
        <input
          type={"email"}
          id={"email"}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          ref={emailRef}
        ></input>
        <label htmlFor="email" className={emailAnim}>
          Email
        </label>
        <input
          type={"password"}
          id={"password"}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          ref={passwordRef}
        ></input>
        <label htmlFor="password" className={passAnim}>
          Password
        </label>
      </div>
      <button type="submit">Login</button>
      <div className="link">
        Don't have an acoount yet?{" "}
        <p onClick={onClickSignupHandler}>Click Here</p>
      </div>
    </form>
 */
