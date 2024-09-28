import React from "react";
import styles from "./DeleteEdit.module.css";
import closed from "../../images/closed.svg";

const EditModal = ({ isOpen, isClose, investment, onSave }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    // TODO: API 연결
    onSave(investment);
    isClose();
  };

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <div className={styles.title_wrapper}>
          <span>코멘트 수정하기</span>
          <img className={styles.close} src={closed} alt="closed icon" onClick={isClose} />
        </div>
        <input className={styles.input} type="text" defaultValue={investment.comment} />
        <div className={styles.authentification}>
          <h4>비밀번호</h4>
          <input className={styles.input} placeholder="패스워드를 입력해주세요" />
          {/* 데이터에 비밀번호 필요 */}
        </div>
        <div className={styles.button_container}>
          <button className={styles.button} onClick={handleSave}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
