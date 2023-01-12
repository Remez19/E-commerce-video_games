import "./SearchBar.css";

import { useState } from "react";

const SearchBar = ({ sendKeyWords }) => {
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
      sendKeyWords(serachBarInput);
    }
  };

  const onSearchBtnClickHandler = () => {
    sendKeyWords(serachBarInput);
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
