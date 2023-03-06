import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Header from "../UI/UI_Elements/Header";
import Footer from "../UI/UI_Elements/Footer";
import { Fragment } from "react";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  let title = "An Error Accourd!";
  let message = error.response.data.message || "Something went wrong.";
  let status = error.response.status;
  // if (isRouteErrorResponse(error)) {
  // }

  //
  if (status === 500) {
    message = error.message;
  }

  if (status === 400) {
    title = "Not Found!";
    message = "Could not find rescource or page.";
  }
  // User not authenticated in some way.
  if (status === 401) {
    navigate("/login");
  }
  // User not allowed to preforme action
  if (status === 403) {
    navigate("/");
  }

  return (
    <Fragment>
      <Header />
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white" }}>{title}</h1>
        <p style={{ color: "white" }}>{message}</p>
        <p style={{ color: "white" }}>{status}</p>
      </div>
      <Footer />
    </Fragment>
  );
}

export default ErrorPage;
