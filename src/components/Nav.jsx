import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import logoImg from "../images/logo_img.svg";
import m_logo_img from "../assets/logo_mobile.svg";
import styles from "./Nav.module.css";
import { getNicknameFromToken } from "../utils/jwtUtils";

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? "white" : "#747474",
  };
}

function Nav() {
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    const userNickname = getNicknameFromToken();
    setNickname(userNickname);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setNickname(null);
    window.location.reload();
  };

  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to="/">
          <img src={logoImg} alt="View my startup Logo" className={styles.logo} />
          <img src={m_logo_img} alt="View my startup Logo" className={styles.m_logo} />
        </Link>
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
          {nickname ? (
            <li className={styles.userMenu}>
              <span>{nickname}님</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                로그아웃
              </button>
            </li>
          ) : (
            <li>
              <NavLink style={getLinkStyle} to="/sign-in">
                로그인
              </NavLink>
            </li>
          )}
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
