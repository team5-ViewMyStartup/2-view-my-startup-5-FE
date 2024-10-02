import React, { useState } from "react";
import styles from "./InvestModal.module.css";
import closed from "../images/closed.svg";

function InvestModal({ isOpen, isClose, company, user, onSave }) {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (!isOpen) return null;

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    const newInvestment = {
      companyId: company.id,
      investorName: user.name,
      amount: amount,
      comment: comment,
    };

    onSave(newInvestment);
    isClose();
  };

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <div className={styles.title_wrapper}>
          <span>기업에 투자하기</span>
          <img className={styles.close} src={closed} alt="closed icon" onClick={isClose} />
        </div>
        <div className={styles.company_information}>
          <img src={company.img} alt={company.name} className={styles.company_img} />
          <h3>{company.name}</h3>
          <p>{company.category}</p>
        </div>
        <form className={styles.investment_form_container}>
          <label>
            투자자 이름
            {/* <h2>{user.name}</h2> */}
            <hr />
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
            비밀번호
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
          </label>
          <label>
            비밀번호 확인
            <input
              className={styles.input}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
            />
          </label>
          <div className={styles.button_container}>
            <button className={styles.cancel_button} type="button" onClick={isClose}>
              취소
            </button>
            <button className={styles.button} type="button" onClick={handleSubmit}>
              투자하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvestModal;
