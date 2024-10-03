import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import logoImg from "../images/logo_img.svg";
import styles from "./Nav.module.css";

// import UserMenu from "./UserMenu";

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? "white" : "#747474",
  };
}

function Nav() {
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to="/">
          <img src={logoImg} alt="View my startup Logo" />
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
          {/**  TODO: 로그인 회원가입 후 살리기 
          <li>
            <UserMenu />
          </li> */}
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
