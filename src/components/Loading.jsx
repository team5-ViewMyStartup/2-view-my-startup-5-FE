import React from "react";
import spinner from "../assets/spinner.gif";
import styles from "./Loading.module.css"

export default () => {
  return (
    <>
      <img src={spinner} alt="로딩중" />
      <h3 className={styles.text}>Loading...</h3>
    </>
  );
};
