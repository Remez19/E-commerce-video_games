import "./SearchBar.css";
import { gamesSliceActions } from "../../../Store/games";

import React, { useCallback } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import useHttp from "../../../hooks/use-http";

const SearchBar = () => {
  const dispatchAction = useDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [serachBarInput, setSearchBarInput] = useState("");
  const setSearchResult = useCallback(
    (searchResult) => {
      dispatchAction(gamesSliceActions.setSearchResultGames(searchResult));
    },
    [dispatchAction]
  );
  // Handle error Case
  const { error, sendRequest: getSearchResults } = useHttp(
    {
      url: "http://localhost:8080/search",
      headers: { "Content-Type": "application/json" },
      body: { keyWords: serachBarInput },
    },
    setSearchResult
  );
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
      // Custom http
      handleSearch();
    }
  };
  const handleSearch = async () => {
    getSearchResults();
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
