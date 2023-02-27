import {
  FaLinkedin,
  FaGithub,
  FaFacebookSquare,
  FaDownload,
} from "react-icons/fa";
import { useState } from "react";

import useHttp from "../../hooks/use-http";
import "./ContactPage.css";

function ContactPage() {
  const [cvIconColor, setCvIconColor] = useState("#ff7474");
  const onLinkedinClick = () => {
    window.open("http://www.linkedin.com/in/remez-david-881972184/");
  };
  const onFacebookClick = () => {
    window.open("http://www.facebook.com/profile.php?id=100002002739058");
  };
  const onClickGithub = () => {
    window.open("http://github.com/Remez19");
  };

  const onFinishCVRequest = (resData) => {
    let file = new Blob([resData], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  const { sendRequest: Download } = useHttp(
    {
      url: "http://localhost:8080/contact",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
        responseType: "arraybuffer",
      },
    },
    onFinishCVRequest,
    false,
    true
  );

  const onCVClickHandler = () => {
    // Backend - Download my cv
    Download();
  };
  return (
    <main className="contact-page__container">
      <div className="contact-page--image" />
      <h3 style={{ color: "#ff7474", fontWeight: "bold" }}>Remez David</h3>
      <h4 style={{ color: "#ff7474", marginTop: "0", marginBottom: "0" }}>
        Junior Software Engineer
      </h4>
      <p style={{ color: "#b1b1b1" }}>
        <i>
          In serach for <b>Fullstack/Devops</b> positions.
        </i>
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "1rem",
        }}
        onMouseEnter={() => {
          setCvIconColor((prevState) => {
            return "#ffe283";
          });
        }}
        onMouseLeave={() => {
          setCvIconColor((prevState) => {
            return "#ff7474";
          });
        }}
        onClick={onCVClickHandler}
      >
        <p style={{ cursor: "pointer", color: cvIconColor }}>My CV</p>
        <FaDownload
          size={"2rem"}
          color={cvIconColor}
          style={{ cursor: "pointer" }}
        />
      </div>
      <p style={{ color: "#ff7474", fontWeight: "bold" }}>Socials</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <FaLinkedin
          size={"2.5rem"}
          color={"#0A66C2"}
          onClick={onLinkedinClick}
          style={{
            cursor: "pointer",
            borderBottom: "1px solid #b1b1b1",
            paddingBottom: "0.2rem",
          }}
        />
        <FaGithub
          size={"2.5rem"}
          color={"#d3d3d3"}
          onClick={onClickGithub}
          style={{
            cursor: "pointer",
            borderBottom: "1px solid #b1b1b1",
            paddingBottom: "0.2rem",
          }}
        />
        <FaFacebookSquare
          style={{
            cursor: "pointer",
            borderBottom: "1px solid #b1b1b1",
            paddingBottom: "0.2rem",
          }}
          size={"2.5rem"}
          color={"#4267B2"}
          onClick={onFacebookClick}
        />
      </div>
    </main>
  );
}

export default ContactPage;
