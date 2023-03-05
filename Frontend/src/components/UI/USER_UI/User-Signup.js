import { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

import useHttp from "../../../hooks/use-http";
import Loading from "../UI_Utill/Loading";
import Card from "../UI_Utill/Card";
import "./User-Login.css";

function UserSignup() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, isValid },
  } = useForm();
  const [emailLabel, setEmailLabel] = useState("");
  const [passwordLabel, setPasswordLabel] = useState("");
  const [userNameLabel, setUserNameLabel] = useState("");
  const [rePasswordLabel, setRePasswordLabel] = useState("");
  const navigate = useNavigate();

  const onLoginFinishHandler = (resData) => {
    navigate("/login");
  };

  const {
    error: requestError,
    sendRequest: signup,
    isLoading,
  } = useHttp({ url: "http://localhost:8080/signup" }, onLoginFinishHandler);

  const onSubmitHandler = (data) => {
    signup({
      email: data.email,
      password: data.password,
      userName: data.userName,
    });
  };
  useEffect(() => {
    if (requestError && requestError.status !== 409) {
      throw requestError;
    }
  }, [requestError]);
  return (
    <Card>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="user-login__container"
      >
        {!isLoading ? (
          <Fragment>
            <div className="user-signup__header-img"></div>
            <div className="user-login__data">
              {requestError && (
                <div className="user-login__error-message">
                  {requestError.message}
                </div>
              )}
              <div className="input-label__box">
                <label htmlFor="userName" className={userNameLabel}>
                  User Name
                </label>
                <input
                  onFocus={() => {
                    if (!getValues("userName")) setUserNameLabel("moveUp");
                  }}
                  {...register("userName", {
                    required: true,
                    onBlur: () => {
                      if (!getValues("userName")) setUserNameLabel("moveDown");
                    },
                  })}
                ></input>
              </div>
              <div className="input-label__box">
                <label htmlFor="email" className={emailLabel}>
                  Email
                </label>
                <input
                  onFocus={() => {
                    if (!getValues("email")) setEmailLabel("moveUp");
                  }}
                  type={"email"}
                  id={"email"}
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
                  id={"password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    onBlur: () => {
                      if (!getValues("password")) setPasswordLabel("moveDown");
                    },
                  })}
                ></input>
              </div>
              <div className="input-label__box">
                <label htmlFor="rePassword" className={rePasswordLabel}>
                  Retype Password
                </label>
                <input
                  onFocus={() => {
                    if (!getValues("rePassword")) setRePasswordLabel("moveUp");
                  }}
                  type={"password"}
                  {...register("rePassword", {
                    required: true,
                    validate: (value) => {
                      return value === getValues("password");
                    },
                    minLength: 6,
                    onBlur: () => {
                      if (!getValues("rePassword"))
                        setRePasswordLabel("moveDown");
                    },
                  })}
                ></input>
              </div>
              <Button
                type="submit"
                size="sm"
                variant="outline-danger"
                disabled={!(isValid && isDirty)}
                className="buttonSumbit"
              >
                Reset Password
              </Button>
            </div>
            <div className="user-login__link-text">
              Have an acoount Already?{" "}
              <NavLink to="/login" className="user-login__link" end>
                Click Here
              </NavLink>
            </div>
          </Fragment>
        ) : (
          <Loading />
        )}
      </form>
    </Card>
  );
}

export default UserSignup;
