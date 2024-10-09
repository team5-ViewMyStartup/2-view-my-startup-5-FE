import React, { useEffect, useState } from "react";
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

const URL = "http://localhost:4000/users/login";

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return regex.test(email) ? "" : "잘못된 이메일 형식입니다.";
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return regex.test(password)
    ? ""
    : "최소 각 한 개 이상의 영문, 숫자, 특수문자를 포함한 8자리 이상의 비밀번호를 입력해주세요.";
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginButtonClicked = async () => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response.headers);
      const [_, token] = response.headers.get("Authorization")?.split(" ");
      // console.log(token);

      localStorage.setItem("token", JSON.stringify({ value: token, expire: Date.now() }));
      const { value, expire } = localStorage.getItem("token");

      if (expire < Date.now()) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      // const { email, nickname } = jwt_decode(value);
      /**
       * 1. 모든 페이지에 접속할때 로컬스토리지의 토큰 조회
       *   - 토큰의 만료기간 비교해서 지났으면 로컬스토리지에있는거 지우고 로그인 페이지로 리다이렉트
       * 2. 로그인한 회원의 정보가 필요할때 로컬스토리지의 토큰을 디코드 해서 유저 정보 가져오기
       */
    } catch (error) {
      console.log(error);
      alert("회원 가입이 되지 않은 회원 정보입니다.");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const errorMsg = validateEmail(value);
    setEmailError(errorMsg);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const errorMsg = validatePassword(value);
    setPasswordError(errorMsg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailErrMsg = validateEmail(email);
    const passwordErrMsg = validatePassword(password);

    setEmailError(emailErrMsg);
    setPasswordError(passwordErrMsg);

    if (emailErrMsg || passwordErrMsg) {
      return;
    }

    const user = USER_DATA.find((user) => user.email === email && user.password === password);

    if (user) {
      alert("로그인에 성공하셨습니다!");
      navigate("/all-company");
    } else {
      setGeneralError("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const isButtonDisabled = () => {
    return emailError || passwordError || !email || !password;
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
            onChange={handleEmailChange}
          />
          {emailError && <p className={styles.error}>{emailError}</p>} {/* 이메일 에러 메시지 */}
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
            onChange={handlePasswordChange}
          />
          {passwordError && <p className={styles.error}>{passwordError}</p>}
          {""}

          <img
            className={styles.toggle_img}
            src={showPassword ? toggleOn : toggleOff}
            alt="toggle visibility"
            onClick={togglePasswordVisibility}
          />
        </div>

        <button
          className={styles.login_button}
          disabled={isButtonDisabled()}
          onClick={loginButtonClicked}
        >
          로그인
        </button>
      </form>

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
