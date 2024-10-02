/**
 * TODO
 * 1. 추후에 Link 사용하여 둘러보기 버튼 눌렀을 시 전체기업페이지로 이동기능 추가 (완료)
 * 2. 로그인하러 가기 글자 눌렀을 시 path login으로 바꾸기(회원가입 페이지 정상작동하는지 확인차 바꿔둠)
 */

import React from "react";
import styles from "./Landing.module.css";
import mainImg from "../../assets/logo1.svg";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className={styles.landing_main_container}>
      <img className={styles.landing_main_img} src={mainImg} alt="main-image" />
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
