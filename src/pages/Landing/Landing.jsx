import React from "react";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

const S3_BASE_URL = process.env.REACT_APP_S3_BASE_URL;

function Landing() {
  return (
    <div className={styles.landing_main_container}>
      <img className={styles.landing_main_img} src={`${S3_BASE_URL}/logo.svg`} alt="main-image" />
      <div className={styles.landing_main_text}>
        <p className={styles.landing_main_already}>이미 계정이 있다면?</p>
        <Link to="/login">
          <p className={styles.landing_main_login}>로그인하러 가기</p>
        </Link>
      </div>

      <Link to="all-company">
        <button className={styles.landing_main_around_button}>둘러보기</button>
      </Link>
    </div>
  );
}

export default Landing;
