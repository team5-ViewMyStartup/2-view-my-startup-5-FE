import React from "react";
import styles from "./Landing.module.css";
import mainImg from "../../images/logo1.svg";

function Landing() {
  return (
    <div className={styles.landing_container}>
      <img src={mainImg} alt="main-image" />
      <p>
        이미 계정이 있다면? <span className={styles.login}> 로그인 </span>
      </p>
      <button className={styles.around}>둘러보기</button>
    </div>
  );
}
export default Landing;
