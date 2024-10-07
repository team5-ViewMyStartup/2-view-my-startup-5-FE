import React from "react";
import IcSearch from "../../imagesjun/ic_search.png";
import IcCloseX from "../../imagesjun/ic_delete.png";
import styles from "./SearchBar.module.css";

const SearchBar = ({ value, onChange, onClear, onSearch }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        className={`${styles.searchInput} ${value ? styles.textShift : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력해주세요"
      />
      <img
        src={IcSearch}
        alt="Search button"
        className={`${styles.searchIcon} ${value ? styles.searchIconActive : ""}`}
        onClick={onSearch}
      />
      {value && (
        <img src={IcCloseX} alt="Delete button" className={styles.deleteButton} onClick={onClear} />
      )}
    </div>
  );
};

export default SearchBar;
