import React, { useState } from "react";
import styles from "./Modal.module.css";
import closed from "../../images/closed.svg";
import { deleteInvestment } from "../../api/api";
import ErrorModal from "./PasswordFailModal";
import { getNicknameFromToken } from "../../utils/jwtUtils";

function DeleteModal({ isOpen, isClose, investment, onDelete }) {
  const [password, setPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const nickname = getNicknameFromToken();
      const token = localStorage.getItem("token");

      if (nickname !== investment.investorName) {
        setErrorModalOpen(true);
        return;
      }
      const investmentId = investment.id;

      await deleteInvestment(
        { investmentId, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      onDelete(investmentId);
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
            <span>삭제 권한 인증 </span>
            <img className={styles.close} src={closed} alt="closed icon" onClick={isClose} />
          </div>
          <div className={styles.authentification}>
            <h4>비밀번호</h4>
            <input
              className={styles.input}
              placeholder="패스워드를 입력해주세요"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.button_container}>
            <button className={styles.button} onClick={handleDelete}>
              삭제하기
            </button>
          </div>
        </div>
      </div>
      <ErrorModal isOpen={errorModalOpen} isClose={() => setErrorModalOpen(false)} />
    </>
  );
}

export default DeleteModal;
