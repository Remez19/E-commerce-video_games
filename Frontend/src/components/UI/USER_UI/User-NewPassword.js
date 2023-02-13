import { useForm } from "react-hook-form";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useHttp from "../../../hooks/use-http";
import Loading from "../UI_Utill/Loading";
import "./User-NewPassword.css";

// nedd to send mail with code and verify it.
function UserNewPassword() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, isValid },
  } = useForm();
  const [emailLabel, setEmailLabel] = useState("");
  const onChangePasswordFinish = () => {};
  const {
    error: requestError,
    sendRequest: changePassword,
    isLoading,
  } = useHttp(
    { url: "http://localhost:8080/new-password" },
    onChangePasswordFinish
  );
  const onSubmitHandler = (data) => {
    changePassword({ email: data.email });
  };

  useEffect(() => {
    if (requestError) {
      throw requestError;
    }
  }, [requestError]);

  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="new-password__container"
        >
          <div>Enter your email</div>
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
          <input
            type="submit"
            disabled={!(isValid && isDirty)}
            value="Reset Password"
          />
        </form>
      )}
    </Fragment>
  );
}

export default UserNewPassword;
