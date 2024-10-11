import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
