import React, { useState } from "react";
import styles from "./Modal.module.css";
import closed from "../../images/closed.svg";
import { updateInvestmentComment } from "../../api/api";
import ErrorModal from "./PasswordFailModal";
import jwtDecode from "jwt-decode";

const EditModal = ({ isOpen, isClose, investment, onSave }) => {
  const [newComment, setNewComment] = useState(investment.comment);
  const [password, setPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"))?.value;
      const { nickname } = jwtDecode(token);

      const updatedComment = await updateInvestmentComment(
        { id: investment._id, investorName: investment.investorName, newComment, password },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );

      onSave(updatedComment);
      isClose();
    } catch (e) {
      setErrorModalOpen(true);
    }
  };

  return (
    <>
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
      <ErrorModal isOpen={errorModalOpen} isClose={() => setErrorModalOpen(false)} />
    </>
  );
};

export default EditModal;
