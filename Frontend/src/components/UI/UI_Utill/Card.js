import "./Card.css";

function Card({ children, width }) {
  return (
    <div
      className="card"
      style={{ width: width ? width : "", maxWidth: "30rem" }}
    >
      {children}
    </div>
  );
}

export default Card;
