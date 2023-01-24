import { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { uiSliceActions } from "../../../Store/ui";

import useHttp from "../../../hooks/use-http";
import Loading from "../UI_Utill/Loading";
import "./User-Login.css";

/**
 * Missing input validation
 */

function UserLogin() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, isValid },
  } = useForm();
  const [emailLabel, setEmailLabel] = useState("");
  const [passwordLabel, setPasswordLabel] = useState("");
  const navigate = useNavigate();
  const dispatchAction = useDispatch();

  const onLoginFinishHandler = (resData) => {
    localStorage.setItem("token", resData.token);
    localStorage.setItem("userName", resData.userName);
    localStorage.setItem("userId", resData.userId);
    dispatchAction(
      uiSliceActions.setLoggedInUser({
        userName: resData.userName,
        userId: resData.userId,
        cart: resData.cart,
        favorites: resData.favorites,
      })
    );
    navigate("/");
  };

  const {
    error: requestError,
    sendRequest: login,
    isLoading,
  } = useHttp({ url: "http://localhost:8080/login" }, onLoginFinishHandler);

  const onSubmitHandler = (data) => {
    login({ email: data.email, password: data.password });
  };
  useEffect(() => {
    if (requestError && requestError.status !== 401) {
      throw requestError;
    }
  }, [requestError]);
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="user-login__container"
    >
      {!isLoading ? (
        <Fragment>
          <div className="user-login__header-img"></div>
          <div className="user-login__data">
            {requestError && (
              <div className="user-login__error-message">
                {requestError.message}
              </div>
            )}
            <div className="input-label__box">
              <label htmlFor="email" className={emailLabel}>
                Email
              </label>
              <input
                onFocus={() => {
                  if (!getValues("email")) setEmailLabel("moveUp");
                }}
                type={"email"}
                {...register("email", {
                  required: true,
                  onBlur: () => {
                    if (!getValues("email")) setEmailLabel("moveDown");
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "invalid email address.",
                  },
                })}
              ></input>
            </div>
            <div className="input-label__box">
              <label htmlFor="password" className={passwordLabel}>
                Password
              </label>
              <input
                onFocus={() => {
                  if (!getValues("password")) setPasswordLabel("moveUp");
                }}
                type={"password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  onBlur: () => {
                    if (!getValues("password")) setPasswordLabel("moveDown");
                  },
                })}
              ></input>
            </div>
          </div>
          <input type="submit" disabled={!(isValid && isDirty)} value="Login" />
          <div className="user-login__link-text">
            Don't have an acoount yet?{" "}
            <NavLink to="/signup" className="user-login__link" end>
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
