import { useState, Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import useHttp from "../../../hooks/use-http";
import Loading from "../UI_Utill/Loading";
import "./User-Login.css";

/**
 * Missing input validation
 */

function UserLogin() {
  const [emailAnim, setEmailAnim] = useState("");
  const [passAnim, setPassAnim] = useState("");
  const [invalidInput, setInvalidInput] = useState(true);
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const [reqConfig, setReqConfig] = useState({
    url: "http://localhost:8080/login",
    headers: { "Content-Type": "application/json" },
    body: { email: "", password: "" },
  });

  const onLoginFinishHandler = (resData) => {
    navigate("/");
  };

  const {
    error,
    sendRequest: login,
    isLoading,
  } = useHttp(reqConfig, onLoginFinishHandler);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email.current.value === "" || password.current.value === "") {
      // setInvalidInput(true);
    } else login();
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
  const onFocusHandler = (e) => {
    if (e.target.id === "email") setEmailAnim("moveUp");
    else setPassAnim("moveUp");
  };
  const onBlurHandler = (e) => {
    if (e.target.id === "email" && email.current.value === "")
      setEmailAnim("moveDown");
    else if (e.target.id === "password" && password.current.value === "") {
      setPassAnim("moveDown");
    }
  };
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <form onSubmit={onSubmitHandler} className="user-login__container">
      {!isLoading ? (
        <Fragment>
          <div className="user-login__header-img"></div>
          <div className="user-login__data">
            <input
              className={
                invalidInput && email.current && email.current.value === ""
                  ? "invalidInput"
                  : ""
              }
              ref={email}
              type={"email"}
              id={"email"}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
              onChange={onChangeHandler}
            ></input>
            <label htmlFor="email" className={emailAnim}>
              Email
            </label>
            <input
              className={
                invalidInput &&
                password.current &&
                password.current.value === ""
                  ? "invalidInput"
                  : ""
              }
              ref={password}
              type={"password"}
              id={"password"}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
              onChange={onChangeHandler}
            ></input>
            <label htmlFor="password" className={passAnim}>
              Password
            </label>
          </div>
          <button type="submit" disabled={invalidInput}>
            Login
          </button>
          <div className="link">
            Don't have an acoount yet?{" "}
            <NavLink to="/signup" style={{ color: "#ff7474" }} end>
              Click Here
            </NavLink>
          </div>
        </Fragment>
      ) : (
        <Loading />
      )}
    </form>
  );
}

export default UserLogin;
