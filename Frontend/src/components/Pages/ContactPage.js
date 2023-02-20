import { FaLinkedin, FaGithub, FaFacebookSquare } from "react-icons/fa";
import "./ContactPage.css";

function ContactPage() {
  const onLinkedinClick = () => {
    window.open("http://www.linkedin.com/in/remez-david-881972184/");
  };
  const onFacebookClick = () => {
    window.open("http://www.facebook.com/profile.php?id=100002002739058");
  };
  const onClickGithub = () => {
    window.open("http://github.com/Remez19");
  };
  return (
    <main className="contact-page__container">
      <div className="contact-page--image" />
      <p style={{ color: "#ff7474", fontWeight: "bold" }}>Remez David</p>
      <p style={{ color: "#ff7474", marginTop: "0", fontWeight: "bold" }}>
        Junior Software Engineer
      </p>
      <p style={{ color: "#ff7474", fontWeight: "bold" }}>Socials</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <FaLinkedin
          size={"2.5rem"}
          color={"#0A66C2"}
          onClick={onLinkedinClick}
        />
        <FaGithub size={"2.5rem"} color={"#d3d3d3"} onClick={onClickGithub} />
        <FaFacebookSquare
          size={"2.5rem"}
          color={"#4267B2"}
          onClick={onFacebookClick}
        />
      </div>
    </main>
  );
}

export default ContactPage;
