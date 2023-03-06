import Alert from "react-bootstrap/Alert";
import { useState } from "react";

import "./AlertMessage.css";

function AlertMessage({ heading, varient, message }) {
  const [show, setShow] = useState(true);
  console.log(show);
  return (
    <Alert
      className=""
      variant={varient}
      onClose={() => {
        setShow(false);
      }}
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        top: !show ? "-2rem" : "0.5rem",
        left: 0,
        right: 0,
        zIndex: "50",
        width: "20rem",
        animation: !show
          ? "moveUp 0.2s ease-out forwards"
          : "moveDown 0.4s ease-out forwards",
      }}
      dismissible
    >
      <Alert.Heading style={{ fontSize: "1.4rem" }}>{heading}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}

export default AlertMessage;
