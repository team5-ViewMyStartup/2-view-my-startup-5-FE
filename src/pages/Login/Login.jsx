import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { postSignIn } from "../../api/api";
import { getToken } from "../../utils/jwtUtils";

const S3_BASE_URL = process.env.REACT_APP_S3_BASE_URL;

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

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/all-company");
    }
  }, [navigate]);

  const loginButtonClicked = async () => {
    try {
      const response = await postSignIn(email, password);
      const token = getToken();
      localStorage.setItem("token", token);
      localStorage.setItem("nickname", response.nickname);

      navigate("/all-company");
      window.location.reload();
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
        <img className={styles.login_logo_img} src={`${S3_BASE_URL}/logo.svg`} alt="logo Image" />
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
            src={
              showPassword
                ? `${S3_BASE_URL}/btn_visibility_on.png`
                : `${S3_BASE_URL}/btn_visibility_off.png`
            }
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
