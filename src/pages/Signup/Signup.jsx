import React from "react";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import logoImg from "../../assets/logo1.svg";
import toggleOff from "../../assets/btn_visibility_off_24px.svg";
import toggleOn from "../../assets/btn_visibility_on_24px.png";
import { useState } from "react";

function Signup() {
  /**
   *TODO
   * 유효성 검사를 위한 사용자 입력 데이터 상태 관리/ error 입력 검증 결과 상태 관리
   * 토글 on, off 상태관리
   */
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  /**
   *TODO
   * 입력 필드 변화 처리 함수 정의 /사용자 입력 즉시 반영하여 유저 경험 개선
   * 폼 제출 처리 함수 정의/ 폼 제출 후 새로 고침 방지
   * 유효성 검사 함수 정의/  토글 on, off 함수 정의
   * 유효성 검사 통과 시 회원가입 처리 로직 구현 / 회원가입 성공 시 화면 이동
   */
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("고생하셨어요. 회원가입에 성공하셨습니다!");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = `이메일을 입력해주세요 :)`;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "이메일 형식을 확인해주세요!";
    }
    if (!formData.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 해요!";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = `앗! 비밀번호가 일치하지 않아요:)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.signup}>
      <Link to="/">
        <img className={styles.signup_logoImg} src={logoImg} alt="logo Image" />
      </Link>
      <form onSubmit={handleSubmit}>
        <div className={styles.email}>
          <label className={styles.email_label} htmlFor="email">
            이메일
          </label>
          <input
            className={styles.email_input}
            id="email"
            placeholder="이메일을 입력해주세요"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.error_message}>{errors.email}</p>}
        </div>
        <div className={styles.nick}>
          <label className={styles.nick_label} htmlFor="nickname">
            닉네임
          </label>
          <input
            className={styles.nick_input}
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            value={formData.nickname}
            onChange={handleChange}
          />
          {errors.nickname && <p className={styles.error_message}>{errors.nickname}</p>}
        </div>
        <div className={styles.pw}>
          <label className={styles.pw_label} htmlFor="password">
            비밀번호
          </label>
          <input
            className={styles.pw_input}
            id="password"
            placeholder="비밀번호를 입력해주세요"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.error_message}>{errors.password}</p>}
          <img
            className={styles.toggle_img}
            src={showPassword ? toggleOff : toggleOn}
            alt="eye Image"
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className={styles.pw_check}>
          <label className={styles.pw_check_label} htmlFor="confirmPassword">
            비밀번호 확인
          </label>
          <input
            className={styles.pw_check_input}
            id="confirmPassword"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className={styles.error_message}>{errors.confirmPassword}</p>
          )}
          <img
            className={styles.toggle_img}
            src={showPassword ? toggleOff : toggleOn}
            alt="eye Image"
            onClick={togglePasswordVisibility}
          />
        </div>
        <button className={styles.signup_button} type="submit">
          회원가입
        </button>
      </form>
      <div className={styles.info}>
        <p className={styles.already_member}>이미 회원이신가요?</p>
        <Link to="/login">
          <p className={styles.go_to_login}>로그인</p>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
