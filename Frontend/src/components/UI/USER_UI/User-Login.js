import { useState, useRef } from "react";

import "./User-Login.css";

function UserLogin({ onClickSignupHandler }) {
  const [emailAnim, setEmailAnim] = useState("");
  const [passAnim, setPassAnim] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const onFocusHandler = (e) => {
    if (e.target.id === "email") setEmailAnim("moveUp");
    else setPassAnim("moveUp");
  };
  const onBlurHandler = (e) => {
    if (e.target.id === "email" && emailRef.current.value === "")
      setEmailAnim("moveDown");
    else if (e.target.id === "password" && passwordRef.current.value === "")
      setPassAnim("moveDown");
  };
  return (
    <form onSubmit={onSubmitHandler} className="user-login__container">
      <div className="user-login__header-img"></div>
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
  );
}

export default UserLogin;
