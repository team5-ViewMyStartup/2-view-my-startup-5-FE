import React from "react";
import styles from "./ListHeader.module.css";

const ListHeader = ({ headers = [], type }) => {
  return (
    <div className={styles.header_container}>
      <div className={styles.header_div}>
        {headers.map((header, index) => (
          <div
            key={index}
            className={`${styles.header_list} ${type === "company" ? styles.company : ""} ${
              type === "status" ? styles.status : ""
            } ${type === "result" ? styles.result : ""}`}
          >
            <strong>{header}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListHeader;
