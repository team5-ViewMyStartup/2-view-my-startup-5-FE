import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "./Container";
import logoImg from "../images/logo_img.svg";
import m_logo_img from "../assets/logo_mobile.svg";
import styles from "./Nav.module.css";
import { getNicknameFromToken } from "../utils/jwtUtils";
import { getToken } from "../utils/jwtUtils";
import {} from "react-router-dom";

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

    const handleStorageChange = () => {
      const updatedNickname = getNicknameFromToken();
      setNickname(updatedNickname);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("logout", "true");
    setNickname(null);
    window.localStorage.setItem("nickname", null);

    window.location.reload();
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
          {nickname ? (
            <li className={styles.userMenu}>
              <span>{nickname}님</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                로그아웃
              </button>
            </li>
          ) : (
            <li>
              <NavLink style={getLinkStyle} to="/login">
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
