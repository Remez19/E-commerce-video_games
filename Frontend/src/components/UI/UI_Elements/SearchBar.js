import { useState } from "react";
import React from "react";
import "./SearchBar.css";
import { useDispatch } from "react-redux";
import { gamesSliceActions } from "../../../Store/games";
const SearchBar = () => {
  const dispatchAction = useDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [serachBarInput, setSearchBarInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    } catch (err) {}
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
