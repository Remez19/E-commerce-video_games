import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import Header from "../UI/UI_Elements/Header";
import Footer from "../UI/UI_Elements/Footer";
import { Fragment } from "react";

function ErrorPage() {
  const error = useRouteError();
  let title = "An Error Accourd!";
  let message = "Something went wrong.";
  let status = error.status;

  //   if (error.status === 500) {
  //     message = JSON.parse(error.data).message;
  //   }
  if (isRouteErrorResponse(error)) {
    message = error.data;
  }
  console.log(error.message);

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
