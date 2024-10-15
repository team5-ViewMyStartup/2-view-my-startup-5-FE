import { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import Container from "./Container";
import styles from "./Nav.module.css";
import { getNicknameFromToken } from "../utils/jwtUtils";
import { getToken } from "../utils/jwtUtils";

const S3_BASE_URL = process.env.REACT_APP_S3_BASE_URL;

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
          <img
            src={`${S3_BASE_URL}/logo_img.svg`}
            alt="View my startup Logo"
            className={styles.logo}
          />
          <img
            src={`${S3_BASE_URL}/logo_mobile.svg`}
            alt="View my startup Logo"
            className={styles.m_logo}
          />
        </div>
        <ul className={styles.menu}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink || ""
              }
              to="/compare"
            >
              나의 기업 비교
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink || ""
              }
              to="/compare-status"
            >
              비교 현황
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink || ""
              }
              to="/invest-status"
            >
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
            <Link
              className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}
              to="/login"
            >
              <div className={styles.log_button}>로그인</div>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Nav;
