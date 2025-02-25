import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { postSignUp } from "../../api/api";
import { getToken } from "../../utils/jwtUtils";

const S3_BASE_URL = process.env.REACT_APP_S3_BASE_URL;

function Signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/all-company");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "email") {
      setEmail(value);
    } else if (id === "nickname") {
      setNickname(value);
    } else if (id === "password") {
      setPassword(value);
    } else if (id === "confirmPassword") {
      setConfirmPassword(value);
    }

    const newErrors = { ...errors };
    switch (id) {
      case "email":
        if (!value) {
          newErrors.email = "이메일을 입력해주세요";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "잘못된 이메일 형식입니다.";
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
        } else if (
          !/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(value)
        ) {
          newErrors.password =
            "최소 각 한 개 이상의 영문, 숫자, 특수문자를 포함한 8자리 이상의 비밀번호를 입력해주세요.";
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (value !== password) {
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
          email,
          nickname,
          password,
        });

        navigate("/login");
      } catch (e) {
        setErrors({ apiError: e.message });
      }
    }
  };
  const isFormValid = () => {
    return email && nickname && password && confirmPassword && Object.keys(errors).length === 0;
  };
  const validateForm = () => {
    const newErrors = {};
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCheckPasswordVisibility = () => {
    setShowCheckPassword(!showCheckPassword);
  };

  return (
    <div className={styles.signup}>
      <Link to="/">
        <img className={styles.signup_logo_img} src={`${S3_BASE_URL}/logo.svg`} alt="logo Image" />
      </Link>
      <form onSubmit={handleSubmit} className={styles.form_wrapper}>
        <div className={styles.email}>
          <label className={styles.email_label} htmlFor="email">
            이메일
          </label>
          <input
            className={styles.email_input}
            id="email"
            placeholder="이메일을 입력해주세요"
            value={email}
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
            value={nickname}
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
            value={password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.error_message}>{errors.password}</p>}
          <img
            className={styles.toggle_img}
            src={
              showPassword
                ? `${S3_BASE_URL}/btn_visibility_on.png`
                : `${S3_BASE_URL}/btn_visibility_off.png`
            }
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
            type={showCheckPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className={styles.error_message}>{errors.confirmPassword}</p>
          )}
          <img
            className={styles.toggle_img}
            src={
              showCheckPassword
                ? `${S3_BASE_URL}/btn_visibility_on.png`
                : `${S3_BASE_URL}/btn_visibility_off.png`
            }
            alt="eye Image"
            onClick={toggleCheckPasswordVisibility}
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
