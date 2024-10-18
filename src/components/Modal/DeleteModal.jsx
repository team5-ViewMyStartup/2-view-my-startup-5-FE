import React, { useState } from "react";
import styles from "./Modal.module.css";
import { deleteInvestment } from "../../api/api";
import ErrorModal from "./PasswordFailModal";
import { getNicknameFromToken, getToken } from "../../utils/jwtUtils";

const S3_BASE_URL = process.env.REACT_APP_S3_BASE_URL;

function DeleteModal({ isOpen, onClose, investment, onDelete }) {
  const [password, setPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorType, setErrorType] = useState("");

  if (!isOpen) return null;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDelete = async () => {
    try {
      const nickname = getNicknameFromToken();
      const token = getToken();

      if (nickname !== investment.investorName) {
        setErrorType("incorrectUser");
        setErrorModalOpen(true);
        return;
      }
      const investmentId = investment.id;

      await deleteInvestment({ investmentId, password }, token);
      onDelete(investmentId);
      onClose();
    } catch (e) {
      setErrorType("incorrectDeletePw");
      setErrorModalOpen(true);
    }
  };

  return (
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal_content}>
          <div className={styles.title_wrapper}>
            <span>삭제 권한 인증 </span>
            <img
              className={styles.close}
              src={`${S3_BASE_URL}/closed.svg`}
              alt="closed icon"
              onClick={onClose}
            />
          </div>
          <div className={styles.authentification}>
            <h4>비밀번호</h4>
            <input
              className={styles.input}
              placeholder="패스워드를 입력해주세요"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              className={styles.toggle_img}
              src={
                showPassword
                  ? `${S3_BASE_URL}/btn_visibility_on.png`
                  : `${S3_BASE_URL}/btn_visibility_off.png`
              }
              alt="눈모양 토글"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className={styles.button_container}>
            <button className={styles.button} onClick={handleDelete}>
              삭제하기
            </button>
          </div>
        </div>
      </div>
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        type={errorType}
      />
    </>
  );
}

export default DeleteModal;
