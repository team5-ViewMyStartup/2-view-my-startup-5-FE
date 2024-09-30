import React from "react";
import styles from "./ListHeader.module.css";

const ListHeader = ({ headers = [] }) => {
  return (
    <div className={styles.header_container}>
      <div className={styles.header_div}>
        {headers.map((header, index) => (
          <div key={index} className={styles.header_list}>
            <strong>{header}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListHeader;
