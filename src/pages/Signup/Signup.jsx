import React from "react";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import logoImg from "../../assets/logo1.svg";
import toggle from "../../assets/btn_visibility_on_24px.svg";

function Signup() {
  return (
    <div className={styles.signup}>
      <Link to="/">
        <img className={styles.signup_logo_img} src={logoImg} alt="logo Image" />
      </Link>
      <div className={styles.email}>
        <label className={styles.email_label} for="email-connection">
          이메일
        </label>
        <input
          className={styles.email_input}
          id="email-connection"
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <div className={styles.nick}>
        <label className={styles.nick_label} for="nick-connection">
          닉네임
        </label>
        <input
          className={styles.nick_input}
          id="nick-connection"
          placeholder="닉네임을 입력해주세요"
        />
      </div>
      <div className={styles.pw}>
        <label className={styles.pw_label} for="pw-connection">
          비밀번호
        </label>
        <input
          className={styles.pw_input}
          id="pw-connection"
          placeholder="비밀번호를 입력해주세요"
          type="password"
        />
        <img className={styles.toggle_img} src={toggle} alt="eye Image" type="password" />
      </div>
      <div className={styles.pw_check}>
        <label className={styles.pw_check_label} for="pw-check-connection">
          비밀번호 확인
        </label>
        <input
          className={styles.pw_check_input}
          id="pw-check-connection"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
        />
        <img className={styles.toggle_img} src={toggle} alt="eye Image" type="password" />
      </div>
      <button className={styles.signup_button}>회원가입</button>
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
