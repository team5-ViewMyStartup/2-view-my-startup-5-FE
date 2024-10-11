import React from "react";
import styles from "./Modal.module.css";
import closed from "../../images/closed.svg";

function PasswordFailModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <div className={styles.title_wrapper}>
          <span></span>
          <img className={styles.close} src={closed} alt="closed icon" onClick={onClose} />
        </div>
        <div className={styles.message}>
          <p>잘못된 비밀번호로 삭제에 실패하셨습니다.</p>
        </div>
        <div className={styles.button_container}>
          <button className={styles.button} onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordFailModal;
