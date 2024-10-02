import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import logoImg from "../../imagesjun/logo1.svg";
import { useNavigate } from "react-router-dom";
import toggleOn from "../../imagesjun/btn_visibility_on_24px.png";
import toggleOff from "../../imagesjun/btn_visibility_off_24px.png";
const USER_DATA = [
  { email: "test@test.com", password: "testtest1!" },
  { email: "test1@test.com", password: "testtest!" },
];
/**
 * TODO
 *
 *동적 오류 메세지 구현
 */

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const isValidateEmail = regex.test(email);
  if (!isValidateEmail) throw new Error("잘못된 이메일 형식입니다.");
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  const isValidatePassword = regex.test(password);
  if (!isValidatePassword) {
    throw new Error(
      `최소 한 개 이상의 영문, 숫자, 특수문자를 포함한 8자리 이상의 비밀번호를 입력해주세요.`,
    );
  }
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      validateEmail(email);
      validatePassword(password);

      const user = USER_DATA.find((user) => user.email === email && user.password === password);

      if (user) {
        navigate("/all-company");
      } else {
        throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.login}>
      <Link to="/all-company">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            className={styles.toggle_img}
            src={showPassword ? toggleOff : toggleOn}
            alt="toggle visibility"
            onClick={togglePasswordVisibility}
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
