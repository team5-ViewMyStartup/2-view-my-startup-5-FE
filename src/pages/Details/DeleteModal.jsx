import React from "react";
import styles from "./DeleteEdit.module.css";
import closed from "../../images/closed.svg";

function DeleteModal({ isOpen, isClose, investment }) {
  if (!isOpen) return null;

  const handleDelete = () => {
    console.log("삭제될 투자항목 처리하기", investment);
    isClose();
  };

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <div className={styles.title_wrapper}>
          <span>삭제 권한 인증 </span>
          <img className={styles.close} src={closed} alt="closed icon" onClick={isClose} />
        </div>
        <div className={styles.authentification}>
          <h4>비밀번호</h4>
          <input className={styles.input} placeholder="패스워드를 입력해주세요" />
          {/* 데이터에 비밀번호 필요 */}
        </div>
        <div className={styles.button_container}>
          <button className={styles.button} onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
