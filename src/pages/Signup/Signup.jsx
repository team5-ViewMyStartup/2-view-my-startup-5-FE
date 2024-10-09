import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import logoImg from "../../assets/logo1.svg";
import toggleOff from "../../imagesjun/btn_visibility_off_24px.png";
import toggleOn from "../../imagesjun/btn_visibility_on_24px.png";
import { postSignUp } from "../../api/api";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  // const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    const newErrors = { ...errors };
    switch (id) {
      case "email":
        if (!value) {
          newErrors.email = "이메일을 입력해주세요";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "이메일 형식을 확인해주세요 :)";
        } else {
          delete newErrors.email;
        }
        break;

      case "nickname":
        if (!value) {
          newErrors.nickname = "닉네임을 입력해주세요";
        } else {
          delete newErrors.nickname;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "비밀번호를 입력해주세요";
        } else if (value.length < 8) {
          newErrors.password = "비밀번호를 8자 이상 입력해주세요";
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await postSignUp({
          email: formData.email,
          nickname: formData.nickname,
          password: formData.password,
        });

        navigate("/login");
      } catch (e) {
        setErrors(e.message);
      }
    }
  };
  const isFormValid = () => {
    return (
      formData.email &&
      formData.nickname &&
      formData.password &&
      formData.confirmPassword &&
      Object.keys(errors).length === 0
    );
  };
  const validateForm = () => {
    const newErrors = {};
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
            src={showPassword ? toggleOn : toggleOff}
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
            src={showPassword ? toggleOn : toggleOff}
            alt="eye Image"
            onClick={togglePasswordVisibility}
          />
        </div>
        <button className={styles.signup_button} type="submit" disabled={!isFormValid()}>
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
