import { useState, Fragment, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { uiSliceActions } from "../../../Store/ui";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import Button from "react-bootstrap/Button";

import useHttp from "../../../hooks/use-http";
import AlertMessage from "../UI_Utill/AlertMessage";
import Loading from "../UI_Utill/Loading";
import Card from "../UI_Utill/Card";
import "./User-Login.css";

function UserLogin() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, isValid },
  } = useForm();
  const [emailLabel, setEmailLabel] = useState("");
  const [passwordLabel, setPasswordLabel] = useState("");
  const [passwordIcon, setPasswordIcon] = useState(false);
  const navigate = useNavigate();
  const dispatchAction = useDispatch();

  const onLoginFinishHandler = async (resData) => {
    localStorage.setItem("token", resData.token);
    localStorage.setItem("userName", resData.userName);
    localStorage.setItem("userEmail", resData.userEmail);
    localStorage.setItem("admin", resData.admin);
    localStorage.setItem("favorites", JSON.stringify(resData.favorites));
    localStorage.setItem("cart", JSON.stringify(resData.cart));

    dispatchAction(
      uiSliceActions.setLoggedInUser({
        userName: resData.userName,
        userEmail: resData.userEmail,
        cart: resData.cart,
        favorites: resData.favorites,
        admin: resData.admin,
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
    // console.log(requestError);
    if (requestError && requestError.response.status !== 401) {
      throw requestError;
    }
  }, [requestError]);
  const passwordIconElement = passwordIcon ? (
    <MdVisibility
      color="#ffe283"
      onClick={() => {
        setPasswordIcon((prevState) => {
          return !prevState;
        });
      }}
      size={"1.2rem"}
      style={{
        position: "absolute",
        marginLeft: "11.7rem",
        marginTop: "0.6rem",
      }}
    />
  ) : (
    <MdVisibilityOff
      color="#ff7474"
      onClick={() => {
        setPasswordIcon((prevState) => {
          return !prevState;
        });
      }}
      size={"1.2rem"}
      style={{
        position: "absolute",
        marginLeft: "11.7rem",
        marginTop: "0.6rem",
      }}
    />
  );
  console.log(requestError);
  return (
    <Fragment>
      {requestError && (
        <AlertMessage
          heading={requestError.response.data.messageClient}
          varient="danger"
          // message={}
        />
        // <div className="user-login__error-message">
        //   {requestError.response.data.messageClient}
        // </div>
      )}
      {!isLoading && (
        <Card>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="user-login__container"
          >
            <div className="user-login__header-img"></div>
            <div className="user-login__data">
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
                  type={passwordIcon ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    onBlur: () => {
                      if (!getValues("password")) setPasswordLabel("moveDown");
                    },
                  })}
                ></input>
                {passwordIconElement}
              </div>
              <Button
                type="submit"
                size="sm"
                variant="outline-danger"
                disabled={!(isValid && isDirty)}
                className="buttonSumbit"
              >
                Login
              </Button>
            </div>
            <div className="user-login__link-text">
              Don't have an acoount yet?{" "}
              <NavLink to="/signup" className="user-login__link" end>
                Click Here
              </NavLink>
            </div>
            <div className="user-login__link-text">
              Forgot your password?{" "}
              <NavLink to="/new-password" className="user-login__link" end>
                Click Here
              </NavLink>
            </div>
          </form>
        </Card>
      )}
      {isLoading && <Loading width={"100%"} height={"100%"} />}
    </Fragment>
  );
}

export default UserLogin;
