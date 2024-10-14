import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/all-company");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>4 0 4</h1>
      <p className={styles.text}>Error</p>
      <p className={styles.text}>Not Fonud</p>
      <p className={styles.migration}>5초 후에 이동됩니다.</p>
    </div>
  );
}

export default NotFoundPage;
