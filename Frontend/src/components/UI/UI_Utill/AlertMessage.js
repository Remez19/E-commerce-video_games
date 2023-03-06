import Alert from "react-bootstrap/Alert";
import { useState } from "react";

import "./AlertMessage.css";

function AlertMessage({ heading, varient, message }) {
  const [show, setShow] = useState(true);
  console.log(show);
  return (
    <div
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        animation: !show
          ? "moveUpAlert 0.4s ease-out forwards"
          : "moveDownAlert 0.4s ease-out forwards",
      }}
    >
      <Alert
        variant={varient}
        onClose={() => {
          setShow(false);
        }}
        style={{
          height: "fit-content",
        }}
        dismissible
      >
        <Alert.Heading style={{ fontSize: "1.4rem" }}>{heading}</Alert.Heading>
        <p>{message}</p>
      </Alert>
    </div>
  );
}

export default AlertMessage;
