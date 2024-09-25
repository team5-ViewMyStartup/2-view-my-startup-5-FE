// TODO: 추후에 Link 사용하여 login 페이지 이동 기능 추가해야함

import React from "react";
import Styles from "./Landing.module.css";
import mainImg from "../assets/logo1.svg";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className={Styles.landing_main_container}>
      <img className={Styles.landing_main_img} src={mainImg} alt="main-image" />
      <div className={Styles.landing_main_text}>
        <p className={Styles.landing_main_already}>이미 계정이 있다면?</p>
        <p className={Styles.landing_main_login}>로그인하러 가기</p>
      </div>
      <button className={Styles.landing_main_around_button}>둘러보기</button>
    </div>
  );
}

export default Landing;
