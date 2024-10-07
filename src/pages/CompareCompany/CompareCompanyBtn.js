import React from "react";
import styles from "./CompareCompanyBtn.module.css";

const CompareCompanyBtn = ({ text, onClick, disabled = false }) => {
  return (
    <div className={styles.buttonWrapper}>
      <button
        className={`${styles.compareCompanyBtn} ${disabled ? styles.disabledBtn : styles.active}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default CompareCompanyBtn;
