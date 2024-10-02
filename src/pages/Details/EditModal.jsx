import React, { useState } from "react";
import styles from "./DeleteEdit.module.css";
import closed from "../../images/closed.svg";
import { updateInvestmentComment } from "../../api/api";

const EditModal = ({ isOpen, isClose, investment, onSave }) => {
  if (!isOpen) return null;

  const [newComment, setNewComment] = useState(investment.comment);
  const [password, setPassword] = useState("");

  const handleSave = async () => {
    // TODO: API 연결

    const updatedComment = await updateInvestmentComment(
      investment._id,
      investment.investorName,
      newComment,
      password,
    );

    onSave(updatedComment);
    isClose();
  };

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <div className={styles.title_wrapper}>
          <span>코멘트 수정하기</span>
          <img className={styles.close} src={closed} alt="closed icon" onClick={isClose} />
        </div>
        <input
          className={styles.input}
          type="text"
          defaultValue={investment.comment}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className={styles.authentification}>
          <h4>비밀번호</h4>
          <input
            className={styles.input}
            placeholder="패스워드를 입력해주세요"
            onChange={(e) => setPassword(e.target.value)}
          />
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
