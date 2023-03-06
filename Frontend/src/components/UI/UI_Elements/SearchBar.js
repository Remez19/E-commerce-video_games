import "./SearchBar.css";

import { useState, useRef } from "react";

const SearchBar = ({ setUserSearch }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchBarRef = useRef();
  // let inputValue;
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
    if (userKey === "Enter") {
      setUserSearch(event.target.value);
    }
  };

  const onSearchBtnClickHandler = () => {
    setUserSearch(searchBarRef.current.value);
  };

  return (
    <div className="search_bar__container">
      <input
        ref={searchBarRef}
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
        style={{ outline: isSearchActive ? "2px solid #ff7474" : "" }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
