import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";

import useHttp from "../../../hooks/use-http";
import Loading from "../UI_Utill/Loading";
import "./User-NewPassword.css";
import Card from "../UI_Utill/Card";

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
    { url: "http://localhost:8080/new-password" },
    onChangePasswordFinish
  );
  const onSubmitHandler = (data) => {
    changePassword({ email: data.email });
  };
  return (
    <Fragment>
      {!isLoading && (
        <Card>
          <Fragment>
            {!emailSent && (
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="new-password__container"
              >
                <div style={{ marginTop: "2rem", textDecoration: "underline" }}>
                  Enter your email
                </div>
                {requestError && (
                  <div style={{ color: "#ff7474" }}>
                    {requestError.data[0].msg}
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
