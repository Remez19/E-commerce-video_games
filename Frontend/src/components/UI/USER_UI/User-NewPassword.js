import { useForm } from "react-hook-form";
import { Fragment, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import useHttp from "../../../hooks/use-http";
import Loading from "../UI_Utill/Loading";
import "./User-NewPassword.css";
import Card from "../UI_Utill/Card";
import AlertMessage from "../UI_Utill/AlertMessage";

// Need styling

function UserNewPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, isValid },
  } = useForm();
  const [emailLabel, setEmailLabel] = useState("");
  const onChangePasswordFinish = () => {
    setEmailSent(true);
  };
  const {
    error: requestError,
    sendRequest: changePassword,
    isLoading,
  } = useHttp(
    { url: `${process.env.REACT_APP_Backend}/new-password` },
    onChangePasswordFinish
  );
  const onSubmitHandler = (data) => {
    changePassword({ email: data.email });
  };
  useEffect(() => {
    if (
      requestError &&
      requestError.response.status !== 401 &&
      requestError.response.status !== 422
    ) {
      throw requestError;
    }
  }, [requestError]);
  return (
    <Fragment>
      {!isLoading && (
        <Card>
          {requestError && (
            <AlertMessage
              heading={requestError.response.data.messageClient}
              varient="danger"
              message={requestError.response.data.dataMessage}
            />
          )}
          <Fragment>
            {!emailSent && (
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="new-password__container"
              >
                <div style={{ marginTop: "2rem", textDecoration: "underline" }}>
                  Enter your email
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
                <Button
                  type="submit"
                  size="sm"
                  variant="outline-danger"
                  disabled={!(isValid && isDirty)}
                  className="buttonSumbit"
                >
                  Reset Password
                </Button>
              </form>
            )}
            {emailSent && (
              <div style={{ color: "#ff7474", textAlign: "center" }}>
                An email has been sent to your email account. Follow the steps
              </div>
            )}
          </Fragment>
        </Card>
      )}
      {isLoading && <Loading width={"100%"} height={"100%"} />}
    </Fragment>
  );
}

export default UserNewPassword;
