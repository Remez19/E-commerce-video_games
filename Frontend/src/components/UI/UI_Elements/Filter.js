import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import { BsFilterRight } from "react-icons/bs";

const Filter = ({ filterUsed }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        style={{
          backgroundColor: "transparent",
          padding: 0,
        }}
      >
        <BsFilterRight size={"2.5rem"} color={""} />
      </Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        <Dropdown.Header>Filter Games</Dropdown.Header>
        <Dropdown.Item
          onClick={() => {
            filterUsed("PS");
          }}
        >
          <button
            style={{
              width: "100%",
              height: "1.5rem",
              backgroundColor: "transparent",
              backgroundPosition: "center",
              border: "none",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${require("../../../images/Platforms/ps.png")})`,
            }}
          ></button>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            filterUsed("XBOX");
          }}
        >
          <button
            style={{
              width: "100%",
              height: "1.5rem",
              backgroundColor: "transparent",
              backgroundPosition: "center",
              border: "none",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${require("../../../images/Platforms/xbox.png")})`,
            }}
          ></button>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            filterUsed("PC");
          }}
        >
          <button
            style={{
              width: "100%",
              height: "1.5rem",
              backgroundColor: "transparent",
              backgroundPosition: "center",
              border: "none",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${require("../../../images/Platforms/pc.png")})`,
            }}
          ></button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Filter;
