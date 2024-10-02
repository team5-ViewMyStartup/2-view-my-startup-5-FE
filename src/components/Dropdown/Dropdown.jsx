import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import dropdownIcon from "../../assets/dropdown.svg";

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
        <img className={styles.dropdown_icon} src={dropdownIcon} alt="dropdown" />
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
