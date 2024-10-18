import React from "react";
import styles from "./Loading.module.css";

const S3_BASE_URL = process.env.REACT_APP_S3_BASE_URL;

export default () => {
  return (
    <>
      <img src={`${S3_BASE_URL}/spinner.gif`} alt="로딩중" />
      <h3 className={styles.text}>Loading...</h3>
    </>
  );
};
