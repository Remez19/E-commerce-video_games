import "./SearchBar.css";
import { gamesSliceActions } from "../../../Store/games";
import { uiSliceActions } from "../../../Store/ui";

import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatchAction = useDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [serachBarInput, setSearchBarInput] = useState("");

  const cssClasses = [
    "search_bar__input",
    !isSearchActive ? "not_active_search" : "",
  ];
  const onFocusHandler = (event) => {
    setIsSearchActive(true);
  };
  const onBlurHandler = (event) => {
    setIsSearchActive(false);
  };
  const onUserKeyDownHandler = (event) => {
    const userKey = event.key;
    if (userKey !== "Enter") {
      setSearchBarInput((prevState) => {
        return event.target.value;
      });
    } else {
      handleSearch();
    }
  };
  const handleSearch = async () => {
    dispatchAction(uiSliceActions.setLoading(true));
    try {
      const res = await fetch("http://localhost:8080/" + serachBarInput, {
        method: "POST",
      });
      if (res.status !== 200) {
        // Need to do better
        throw new Error("Something went worng ");
      }

      const resData = await res.json();
      if (resData.games.length > 0) {
        dispatchAction(gamesSliceActions.setSearchResultGames(resData));
      }
      // console.log(resData);
    } catch (err) {
      console.log(err);
    } finally {
      function delay(milliseconds) {
        return new Promise((resolve) => {
          setTimeout(resolve, milliseconds);
        });
      }
      await delay(2000);
      dispatchAction(uiSliceActions.setLoading(false));
    }
  };
  const onSearchBtnClickHandler = () => {
    handleSearch();
  };

  return (
    <div className="search_bar__container">
      <input
        type="text"
        className={cssClasses.join(" ")}
        placeholder="Search for Games"
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onKeyUpCapture={onUserKeyDownHandler}
      ></input>
      <button
        className="serach_bar__search_btn"
        onClick={onSearchBtnClickHandler}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
