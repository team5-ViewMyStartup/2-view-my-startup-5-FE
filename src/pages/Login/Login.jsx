import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import logoImg from "../../imagesjun/logo1.svg";
import { useNavigate } from "react-router-dom";
import toggleOn from "../../imagesjun/btn_visibility_on_24px.svg";
import toggleOff from "../../imagesjun/btn_visibility_off_24px.svg";
const USER_DATA = [
  { email: "test@test.com", password: "testest!" },
  { email: "test1@test.com", password: "testest1!" },
];
/**
 * TODO
 * 다음업무: 비밀번호를 맞게 입력해도 틀렸다는 오류 해결 예정
 * 메모:
 * 1. 제어 컴포넌트 적용완료 / 유효성 검사 기능 완료/
 * 2. 이후 로그인 기능 실제 백엔드와 함꼐 구현한다면 관련 코드 추가  /
 * 3. 토글 기능 추가 완료
 * 4. setError > throw Error로 변경 완료
 * 5. 로그인 이후료전체리스트로 이동 구현 예정
 *
 *
 */

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const isValidateEmail = regex.test(email);
  if (!isValidateEmail) {
    throw new Error("이메일 다시써주삼 ");
  }
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  const isValidatePassword = regex.test(password);
  if (!isValidatePassword) {
    throw new Error("비번 틀렸음.");
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
        console.log("로그인 성공!");
        navigate("/all-company");
      } else {
        throw new Error("이메일 또는 비밀번호가 잘못되었습니다.");
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
