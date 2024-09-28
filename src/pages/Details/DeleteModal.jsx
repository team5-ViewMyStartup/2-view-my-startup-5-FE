import React from "react";
import styles from "./DeleteModal.module.css";
import closed from "../../images/closed.svg";

function DeleteModal({ isOpen, isClose, investment }) {
  if (!isOpen) return null;

  const handleDelete = () => {
    console.log("삭제될 투자항목 처리하기", investment);
    isClose();
  };

  return (
    <div className={styles.delete_modal_container}>
      <div className={styles.delete_modal_content}>
        <div className={styles.delete_title}>
          <span>삭제 권한 인증 </span>
          <img src={closed} alt="closed icon" onClick={isClose} />
        </div>
        <div className={styles.delete_authentification}>
          <h4>비밀번호</h4>
          <input className={styles.delete_input} placeholder="패스워드를 입력해주세요" />
          {/* 데이터에 비밀번호 필요 */}
          <button className={styles.delete_button} onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
