import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import { addNewInvestment } from "../../api/api";
import { getNicknameFromToken } from "../../utils/jwtUtils";
import PasswordFailModal from "./PasswordFailModal";

const S3_BASE_URL = process.env.REACT_APP_S3_BASE_URL;

function InvestModal({ isOpen, onClose, company, onAdd }) {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorType, setErrorType] = useState("");

  useEffect(() => {
    const userNickname = getNicknameFromToken();
    setNickname(userNickname);
  }, [isOpen]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  if (!company) {
    return null;
  }
  const handleSubmit = async () => {
    if (!isOpen) return null;

    if (!nickname) {
      setErrorType("findNoUser");
      setErrorModalOpen(true);
      return;
    }

    if (!password) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    try {
      const newInvestment = {
        companyId: company.id,
        amount: Number(amount),
        comment: comment,
        password,
        investorName: nickname,
      };
      const response = await addNewInvestment(newInvestment);
      if (response && response.status === 201) {
        const investmentData = response.data;
        onAdd(investmentData);
      }
      onClose();
    } catch (e) {
      setErrorType("incorrectInvestPw");
      console.log("errorModalOpen state:", errorModalOpen);
      setErrorModalOpen(true);
    }
  };
  return (
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal_content}>
          <div className={styles.title_wrapper}>
            <span>기업에 투자하기</span>
            <img
              className={styles.close}
              src={`${S3_BASE_URL}/closed.svg`}
              alt="closed icon"
              onClick={onClose}
            />
          </div>
          <h3>투자 기업 정보</h3>
          <div className={styles.company_information}>
            <img src={company.image} alt="company" className={styles.company_img} />
            <h3>{company.name}</h3>
            <p>{company.category}</p>
          </div>
          <form className={styles.investment_form_container}>
            <label>
              투자자 이름
              <h4>{nickname}</h4>
            </label>
            <label>
              투자 금액
              <input
                className={styles.input}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="투자 금액을 입력해주세요"
              />
            </label>
            <label>
              투자 코멘트
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="투자에 대한 코멘트를 입력해주세요"
              />
            </label>
            <label>
              <div className={styles.authentification}>
                비밀번호
                <input
                  className={styles.input}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력해주세요"
                />
                <img
                  className={styles.toggle_img_invest}
                  src={
                    showPassword
                      ? `${S3_BASE_URL}/btn_visibility_on.png`
                      : `${S3_BASE_URL}/btn_visibility_off.png`
                  }
                  alt="눈모양 토글"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </label>
            <div className={styles.button_container}>
              <button className={styles.cancel_button} type="button" onClick={onClose}>
                취소
              </button>
              <button className={styles.button} type="button" onClick={handleSubmit}>
                투자하기
              </button>
            </div>
          </form>
        </div>
      </div>
      <PasswordFailModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        type={errorType}
      />
    </>
  );
}
export default InvestModal;
