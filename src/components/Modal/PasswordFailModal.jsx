import React from "react";
import styles from "./Modal.module.css";
import closed from "../../images/closed.svg";

function PasswordFailModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;

  const message = () => {
    switch (type) {
      case "incorrectPw":
        return "잘못된 비밀번호로 삭제에 실패하셨습니다.";
      case "incorrectEd":
        return "잘못된 비밀번호로 수정에 실패하셨습니다.";
      case "incorrectUser":
        return "본인이 아니면 불가합니다.";
      default:
        return "오류가 발생하였습니다.";
    }
  };

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <div className={styles.title_wrapper}>
          <span></span>
          <img className={styles.close} src={closed} alt="closed icon" onClick={onClose} />
        </div>
        <div className={styles.message}>
          <p>{message()}</p>
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
