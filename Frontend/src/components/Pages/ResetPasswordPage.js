import { useForm } from "react-hook-form";
import { useState, Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../UI/UI_Utill/Loading";
import useHttp from "../../hooks/use-http";

// Need styling !
function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token, userId } = useParams();
  const [passwordLabel, setPasswordLabel] = useState("");
  const [rePasswordLabel, setRePasswordLabel] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, isValid },
  } = useForm();

  const onFinishResetPasswordHandler = () => {
    navigate("/login");
  };
  const {
    error: requestError,
    sendRequest: resetPassword,
    isLoading,
  } = useHttp(
    { url: `${process.env.REACT_APP_Backend}/reset-password` },
    onFinishResetPasswordHandler
  );

  const onSubmitHandler = (data) => {
    console.log(token);
    resetPassword({ newPassword: data.password, userId: userId, token: token });
  };
  useEffect(() => {
    if (requestError && requestError.status !== 409) {
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
          <div color="#ffe283">New Password!</div>
          <div className="user-login__data">
            {requestError && (
              <div className="user-login__error-message">
                {requestError.message}
              </div>
            )}
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
          </div>
          <input type="submit" disabled={!(isValid && isDirty)} value="Reset" />
        </Fragment>
      ) : (
        <Loading />
      )}
    </form>
  );
}

export default ResetPasswordPage;
