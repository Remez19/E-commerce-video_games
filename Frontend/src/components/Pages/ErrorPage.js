import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import Header from "../UI/UI_Elements/Header";
import Footer from "../UI/UI_Elements/Footer";
import { Fragment } from "react";

function ErrorPage() {
  const error = useRouteError();
  let title = "An Error Accourd!";
  let message = error.message || "Something went wrong.";
  let status = error.status;

  console.log(error);
  // if () {
  //   message = error.data.message;
  //   console.log(message);
  // }
  if (isRouteErrorResponse(error)) {
  }
  if (error.status === 500) {
    message = error.message;
  }
  if (error.status === 400) {
    title = "Not Found!";
    message = "Could not find rescource or page.";
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
