// import { useState } from "react";
import { Link } from "react-router-dom";
// import Label from "../components/Label";
// import Input from "../components/Input";
// import Button from "../components/Button";
// import HorizontalRule from "../components/HorizontalRule";
// import Link from "../components/Link";
import GoogleImage from "../../images/google.svg";
import styles from "./Login.module.css";

function LoginPage() {
  return (
    <>
      <h1 className={styles.heading}>로그인</h1>
      {/* <form className={styles.Form} onSubmit={handleSubmit}> */}
      <form className={styles.Form}>
        <label className={styles.Label} htmlFor="email">
          이메일
        </label>
        <input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="이메일"
          // value={values.email}
          // onChange={handleChange}
        />
        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <input
          id="password"
          className={styles.Input}
          name="password"
          type="password"
          placeholder="비밀번호"
          // value={values.password}
          // onChange={handleChange}
        />
        <button className={styles.Button}>로그인</button>
        <p className={styles.HorizontalRule}>또는</p>
        <button className={styles.GoogleButton} type="button" appearance="secondary" as={Link}>
          <img src={GoogleImage} alt="Google" />
          구글로 시작하기
        </button>
        <div className={styles.Footer}>
          회원이 아니신가요? <Link to="/register">회원가입하기</Link>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
