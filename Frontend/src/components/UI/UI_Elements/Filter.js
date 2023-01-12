import { useState } from "react";

import "./Filter.css";

const Filter = ({ filterUsed, filterPicked }) => {
  const [active, setActive] = useState(false);
  const openFilterHandler = (e) => {
    if (e.target.id === "main") setActive((prevState) => !prevState);
  };
  const handleFilterPick = (event) => {
    const filterValue = event.target.innerText;
    filterUsed(filterValue);
  };

  return (
    <div
      className={`filter-container ${active && "active-filter"}`}
      onClick={openFilterHandler}
      id={"main"}
    >
      <div className={`dropdown-menu ${active && "active-dropdown-menu"}`}>
        Filter
        <h6>Platfroms:</h6>
        <ul>
          <li>
            <button
              className={`dropdown-menu__item ${
                filterPicked === "PS" && "active-filter__item"
              }`}
              onClick={handleFilterPick}
            >
              PS
            </button>
          </li>
          <li>
            <button
              className={`dropdown-menu__item ${
                filterPicked === "XBOX" && "active-filter__item"
              }`}
              onClick={handleFilterPick}
            >
              XBOX
            </button>
          </li>
          <li>
            <button
              className={`dropdown-menu__item ${
                filterPicked === "PC" && "active-filter__item"
              }`}
              onClick={handleFilterPick}
            >
              PC
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
