import { useState } from "react";
import React from "react";
import "./SearchBar.css";
const SearchBar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
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
  // const
  return (
    <div className="search_bar__container">
      <input
        type="text"
        className={cssClasses.join(" ")}
        placeholder="Search for Games"
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      ></input>
      <button className="serach_bar__search_btn">Search</button>
    </div>
  );
};

export default SearchBar;
