import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { gamesSliceActions } from "../../../Store/games";
import useHttp from "../../../hooks/use-http";
import "./Filter.css";

const Filter = ({ filterUsed }) => {
  const dispatchAction = useDispatch();
  const [active, setActive] = useState(false);
  const openFilterHandler = (e) => {
    if (e.target.id === "main") setActive((prevState) => !prevState);
  };
  const handleFilterPick = (event) => {
    filterUsed();
    fetchGames({ filter: event.target.innerText });
  };
  const setFilterResult = useCallback(
    (resData) => {
      dispatchAction(gamesSliceActions.setGames(resData));
    },
    [dispatchAction]
  );
  const { error, sendRequest: fetchGames } = useHttp(
    {
      url: "http://localhost:8080/",
      headers: { "Content-Type": "application/json" },
    },
    setFilterResult
  );

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
            <button className="dropdown-menu__item" onClick={handleFilterPick}>
              PS
            </button>
          </li>
          <li>
            <button className="dropdown-menu__item" onClick={handleFilterPick}>
              XBOX
            </button>
          </li>
          <li>
            <button className="dropdown-menu__item" onClick={handleFilterPick}>
              PC
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
