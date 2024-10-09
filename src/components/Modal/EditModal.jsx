import React, { useState } from "react";
import styles from "./Modal.module.css";
import closed from "../../images/closed.svg";
import { updateInvestmentComment } from "../../api/api";
import ErrorModal from "./PasswordFailModal";
import { jwtDecode } from "jwt-decode";

const EditModal = ({ isOpen, isClose, investment, onSave }) => {
  const [newComment, setNewComment] = useState(investment.comment);
  const [password, setPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);

      const nickname = decodedToken.nickname;

      if (nickname !== investment.investorName) {
        setErrorMessage("투자자 이름이 일치하지 않습니다.");
        setErrorModalOpen(true);
        return;
      }

      const requestData = {
        id: investment._id,
        investorName: investment.investorName,
        newComment,
        password,
      };

      const updatedComment = await updateInvestmentComment(requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("서버 응답:", updatedComment);

      onSave(updatedComment);
      isClose();
    } catch (e) {
      console.error("Error while saving the comment:", e);
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
