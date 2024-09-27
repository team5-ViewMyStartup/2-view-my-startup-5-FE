import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import logoImg from "../../imagesjun/logo1.svg";


const USER_DATA = [
  { email: "test@test.com", password: "testest!" },
  { email: "test1@test.com", password: "testest1!" },
];

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const isValidateEmail = regex.test(email);
  if (!isValidateEmail) {
    throw new Error("이메일 아님");
  }
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  const isValidatePassword = regex.test(password);
  if (!isValidatePassword) {
    throw new Error("비번 아님.");
  }
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      validateEmail(email);
      validatePassword(password);
/** 
      *TODO 로그인 로직 구현
      *useState는 값이 변할때 사용, 현재로서는 필요없음
      *유효성 검사 후 로그인 로직 구현 , 폼 제출 이벤트 핸들러 추가

      */
      const user = USER_DATA.find((user) => user.email === email && user.password === password);

      if (user) {
        console.log("로그인 성공!"); 
      } else {
        throw new Error("이메일 또는 비밀번호가 잘못되었습니다."); 
      }
    } catch (err) {
      setError(err.message);
    }
  };


function Login() {
  return (
    <div className={styles.login}>
      <Link to="/">
        <img className={styles.login_logo_img} src={logoImg} alt="logo Image" />
      </Link>

      <form onSubmit={handleSubmit}>
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
      </form>

    {error && <p className={styles.error}>{error}</p>} 

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
