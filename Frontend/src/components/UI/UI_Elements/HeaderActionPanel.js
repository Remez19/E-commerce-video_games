import "./HeaderActionPanel.css";

import { useDispatch } from "react-redux";

import useHttp from "../../../hooks/use-http";
import { gamesSliceActions } from "../../../Store/games";
import { useState } from "react";

const HeaderActionPanel = () => {
  const [active, setActive] = useState("");
  console.log(active);
  const dispatchAction = useDispatch();
  const updateGameCatalog = (data) => {
    dispatchAction(gamesSliceActions.setSearchResultGames(data));
  };
  // Handle error case!
  const { error, sendRequest: fetchFillteredGames } = useHttp(
    {
      url: "http://localhost:8080/filter",
      headers: { "Content-Type": "application/json" },
    },
    updateGameCatalog
  );
  const onFilterPressHandler = (event) => {
    setActive(event.target.innerText);
    fetchFillteredGames({ filter: event.target.innerText });
  };
  return (
    <div className={"action_panel"}>
      <button
        onClick={onFilterPressHandler}
        className={`action_panel_button ${active === "PS" && "active"}`}
      >
        PS
      </button>
      <button
        onClick={onFilterPressHandler}
        className={`action_panel_button ${active === "XBOX" && "active"}`}
      >
        XBOX
      </button>
      <button
        onClick={onFilterPressHandler}
        className={`action_panel_button ${active === "PC" && "active"}`}
      >
        PC
      </button>
    </div>
  );
};
export default HeaderActionPanel;
