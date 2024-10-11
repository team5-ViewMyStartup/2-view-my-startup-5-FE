import { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import Container from "./Container";
import logoImg from "../images/logo_img.svg";
import m_logo_img from "../assets/logo_mobile.svg";
import styles from "./Nav.module.css";
import { getNicknameFromToken } from "../utils/jwtUtils";
import { getToken } from "../utils/jwtUtils";

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? "white" : "#747474",
  };
}

function Nav() {
  const [nickname, setNickname] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userNickname = getNicknameFromToken();
    setNickname(userNickname);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setNickname(null);
    window.localStorage.setItem("nickname", null);
    window.location.replace("/login");
  };
  const handleLogoClick = () => {
    const token = getToken();
    if (token) {
      navigate("/all-company");
    } else {
      navigate("/");
    }
  };
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <div onClick={handleLogoClick} className={styles.logo_click}>
          <img src={logoImg} alt="View my startup Logo" className={styles.logo} />
          <img src={m_logo_img} alt="View my startup Logo" className={styles.m_logo} />
        </div>
        <ul className={styles.menu}>
          <li>
            <NavLink style={getLinkStyle} to="/compare">
              나의 기업 비교
            </NavLink>
          </li>
          <li>
            <NavLink style={getLinkStyle} to="/compare-status">
              비교 현황
            </NavLink>
          </li>
          <li>
            <NavLink style={getLinkStyle} to="/invest-status">
              투자 현황
            </NavLink>
          </li>
        </ul>
        {nickname ? (
          <div className={styles.user_menu}>
            <span>{nickname}님</span>
            <button onClick={handleLogout} className={styles.log_button}>
              로그아웃
            </button>
          </div>
        ) : (
          <div className={styles.user_menu}>
            <Link styles={getLinkStyle} to="/login">
              <div className={styles.log_button}>로그인</div>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Nav;
