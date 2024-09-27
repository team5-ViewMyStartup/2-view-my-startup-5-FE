import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import logoImg from "../../imagesjun/logo1.svg";

function Login() {
  return (
    <div className={styles.login}>
      <Link to="/">
        <img className={styles.login_logo_img} src={logoImg} alt="logo Image" />
      </Link>

      <div className={styles.email}>
        <label className={styles.email_label} htmlFor="email-login">
          이메일
        </label>
        <input
          className={styles.email_input}
          id="email-login"
          placeholder="이메일을 입력해주세요"
        />
      </div>

      <div className={styles.pw}>
        <label className={styles.pw_label} htmlFor="pw-login">
          비밀번호
        </label>
        <input
          className={styles.pw_input}
          id="pw-login"
          placeholder="비밀번호를 입력해주세요"
          type="password"
        />
      </div>

      <button className={styles.login_button}>로그인</button>

      <div className={styles.info}>
        <p className={styles.not_member}>처음이신가요?</p>
        <Link to="/signup">
          <p className={styles.go_to_signup}>회원가입</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
