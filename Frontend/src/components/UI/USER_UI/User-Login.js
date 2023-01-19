import { useState, useRef, Fragment, useEffect } from "react";
import { useNavigate, json } from "react-router-dom";

import useHttp from "../../../hooks/use-http";
import Loading from "../UI_Utill/Loading";
import "./User-Login.css";

function UserLogin({ onClickSignupHandler }) {
  const [emailAnim, setEmailAnim] = useState("");
  const [passAnim, setPassAnim] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const navigate = useNavigate();
  const [reqConfig, setReqConfig] = useState({
    url: "http://localhost:8080/login",
    headers: { "Content-Type": "application/json" },
    body: { email: "", password: "" },
  });
  const emailRef = useRef();
  const passwordRef = useRef();

  const onLoginFinishHandler = (resData) => {
    console.log(resData);
    navigate("/", { isError: true, error });
  };

  const {
    error,
    sendRequest: login,
    isLoading,
  } = useHttp(reqConfig, onLoginFinishHandler);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (emailRef.current.value === "") {
      setInvalidInput(true);
      return;
    }
    if (passwordRef.current.value === "") {
      setInvalidInput(true);
      return;
    }
    login();
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
    setReqConfig((prevState) => {
      return {
        ...prevState,
        body: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      };
    });
  };
  useEffect(() => {
    if (error) {
      console.log(error.message);
      // throw new Response(JSON.stringify({ message: error.message }), {
      //   status: error.status,
      // });
      throw json({ message: error.message }, { status: error.status });
    }
  }, [error]);
  return (
    <form onSubmit={onSubmitHandler} className="user-login__container">
      {!isLoading ? (
        <Fragment>
          <div className="user-login__header-img"></div>
          <div className="user-login__data">
            <input
              className={
                invalidInput && emailRef.current.value === ""
                  ? "invalidInput"
                  : ""
              }
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
              className={
                invalidInput && passwordRef.current.value === ""
                  ? "invalidInput"
                  : ""
              }
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
        </Fragment>
      ) : (
        <Loading />
      )}
    </form>
  );
}

export default UserLogin;
