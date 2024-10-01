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
 * 진행 중 업무 및 오늘까지 끝내야할 업무
 * 1. 66번째 줄 setError > throw Er심or로 변경 완료 ( 그러나 69번쨰 줄에는 여전히 setError 필요.. 꼭 없에야 하는건지.. 방법 모르겠음)
 *
 *
 *
 * 메모:
 * 1. 제어 컴포넌트 적용완료 / 유효성 검사 기능 완료/
 * 2. 이후 로그인 기능 실제 백엔드와 함꼐 구현한다면 관련 코드 추가  /
 * 3. 토글 기능 추가 완료
 * 4. 비밀번호를 맞게 입력해도 틀렸다는 오류 해결 예정
 * 5. 로그인 이후 전체리스트로 이동 구현 완료
 *
 */

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const isValidateEmail = regex.test(email);
  if (!isValidateEmail)
    throw new Error("주인님 용서해주세요 ㅠㅠ.. 혹시, 잘못된 이메일 형식이 아닌가요? ");
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  const isValidatePassword = regex.test(password);
  if (!isValidatePassword) {
    throw new Error(
      `최초 한개이상의 영문, 숫자, 특수문자를 포함한 8자리 이상의 비밀번호를 입력해 주셨을까요?:)`,
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
        console.log(
          "어서오세요 주인님. 쫌 오래걸렸지만 로그인에 드디어 성공했습니다! 퇴근하셔도 되겠네요!",
        );
        navigate("/all-company");
      } else {
        throw new Error("앗! 이메일 또는 비밀번호가 잘못되었다고 하네요 ? ㅠㅠ");
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
