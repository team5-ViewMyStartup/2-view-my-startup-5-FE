import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import logoImg from "../../imagesjun/logo1.svg";

const USER_DATA = [
  { email: "test@test.com", password: "testest!" },
  { email: "test1@test.com", password: "testest1!" },
];
/**
 * TODO
 * 1. 제어 컴포넌트하면 진행하면 여기서는 문제없이 작동 및 완료
 * 2. 이후 로그인 기능 실제 백엔드와 함꼐 구현한다면 이후FE쪽 서버 아이디패스워드 API 코드 추가  /
 *
 */

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

      const user = USER_DATA.find((user) => user.email === email && user.password === password);

      if (user) {
        console.log("로그인 성공!");
      } else {
        setError("이메일 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

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
        {/* TODO:제어 컴포넌트 만들어서 적용하기 ( 릭엑 데이터쪽) */}
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
