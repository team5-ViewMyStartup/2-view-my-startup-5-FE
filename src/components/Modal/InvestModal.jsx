import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import closed from "../../images/closed.svg";
import { addNewInvestment } from "../../api/api";
import { getNicknameFromToken } from "../../utils/jwtUtils";

function InvestModal({ isOpen, isClose, company, onSave, onAdd }) {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const userNickname = getNicknameFromToken();
    setNickname(userNickname);
  }, [isOpen]);

  if (!company) {
    return null;
  }
  const handleSubmit = async () => {
    if (!isOpen) return null;

    if (!password) {
      alert("비밀번호를 입력해주세요");
      return;
    }

    const newInvestment = {
      companyId: company.id,
      amount: Number(amount),
      comment: comment,
      password,
    };

    const response = await addNewInvestment(newInvestment);
    onSave(response);
    onAdd(newInvestment);
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
          <img src={company.image} alt="company" className={styles.company_img} />
          <h3>{company.name}</h3>
          <p>{company.category}</p>
        </div>
        <form className={styles.investment_form_container}>
          <label>
            투자자 이름
            <h5>{nickname}</h5>
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
