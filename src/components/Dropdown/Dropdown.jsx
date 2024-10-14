import React, { useState } from "react";
import styles from "./Dropdown.module.css";

const S3_BASE_URL = process.env.REACT_APP_S3_BASE_URL;

const Dropdown = ({ options, selectedOption, onSelect, isCompanyOptions }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const handleOptionClick = (value) => {
    onSelect(value);
    setDropdown(false);
  };

  return (
    <div className={`${styles.dropdown} ${isCompanyOptions ? styles.company_dropdown : ""}`}>
      <div className={styles.dropdown_select} onClick={toggleDropdown}>
        {selectedOption}
        <img className={styles.dropdown_icon} src={`${S3_BASE_URL}/dropdown.svg`} alt="dropdown" />
      </div>
      {dropdown && (
        <ul className={styles.dropdown_list}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles[option.className]}
              onClick={() => {
                handleOptionClick(option.value);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
