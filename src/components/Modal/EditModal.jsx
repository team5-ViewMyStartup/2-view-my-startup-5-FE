import React, { useState } from "react";
import styles from "./Modal.module.css";
import closed from "../../images/closed.svg";
import { updateInvestmentComment } from "../../api/api";
import ErrorModal from "./PasswordFailModal";
import { getNicknameFromToken, getToken } from "../../utils/jwtUtils";
import toggleOn from "../../assets/btn_visibility_on_24px.png";
import toggleOff from "../../assets/btn_visibility_off_24px.png";

const EditModal = ({ isOpen, onClose, investment, onSave, onEdit }) => {
  const [newComment, setNewComment] = useState(investment.comment);
  const [password, setPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSave = async () => {
    try {
      const nickname = getNicknameFromToken();
      const token = getToken();

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

      const updatedComment = await updateInvestmentComment(
        {
          investmentId: investmentId,
          investorName: investment.investorName,
          comment: newComment,
          password,
        },
        token,
      );

      onEdit(updatedComment);
      onClose();
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
            <img className={styles.close} src={closed} alt="closed icon" onClick={onClose} />
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
              type={showPassword ? "text" : "password"}
              placeholder="패스워드를 입력해주세요"
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              className={styles.toggle_img}
              src={showPassword ? toggleOn : toggleOff}
              alt="눈모양 토글"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className={styles.button_container}>
            <button className={styles.button} onClick={handleSave}>
              수정하기
            </button>
          </div>
        </div>
      </div>
      <ErrorModal isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} />
    </>
  );
};

export default EditModal;
