import React, { useState } from "react";
import styles from "./Modal.module.css";
import closed from "../../images/closed.svg";
import { updateInvestmentComment } from "../../api/api";
import ErrorModal from "./PasswordFailModal";
import { getNicknameFromToken } from "../../utils/jwtUtils";

const EditModal = ({ isOpen, isClose, investment, onSave, onEdit }) => {
  const [newComment, setNewComment] = useState(investment.comment);
  const [password, setPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const nickname = getNicknameFromToken();
      const token = localStorage.getItem("token");

      if (nickname !== investment.investorName) {
        setErrorModalOpen(true);
        return;
      }
      const investmentId = investment.id;

      const requestData = {
        investmentId: investmentId,
        investorName: investment.investorName,
        comment: newComment,
        password,
      };

      const updatedComment = await updateInvestmentComment(requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onEdit(updatedComment);
      isClose();
    } catch (e) {
      console.error("코멘트 수정 실패", e);
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
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className={styles.authentification}>
            <h4>비밀번호</h4>
            <input
              className={styles.input}
              type="password"
              placeholder="패스워드를 입력해주세요"
              onChange={(e) => setPassword(e.target.value)}
            />
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
