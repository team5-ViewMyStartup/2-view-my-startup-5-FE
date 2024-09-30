import React from "react";
import styles from "./Compare.module.css";
import icRestart from "../../imagesjun/ic_restart.png";
import icAdd from "../../imagesjun/ic_add.png";
import btnPlus from "../../imagesjun/btn_plus.png";
import { useState } from "react";

function Compare() {
  /*TODO
   *상태관리
   */
  const [resetBtnText, setResetBtnText] = useState("전체 초기화");
  const [isCompareButtonEnabled, setIsCompareButtonEnabled] = useState(true);
  const [isComparisonVisible, setIsComparisonVisible] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [additionalCompanies, setAdditionalCompanies] = useState([]);
  const handleResetButtonClick = () => {
    setResetBtnText("초기화 완료");
    /*TODO
     * 핸들러
     *초기화 기능 구현
     */
    if (selectedCompanies.length > 0 && additionalCompanies.length > 0) {
      setIsComparisonVisible(true);
      // setResetButtonText("다른 기업 비교하기");
    }
  };

  const handleComparisonClick = () => {
    /*TODO
     *
     *비교 기능 구현
     */
    console.log("비교 시작");
  };

  return (
    <div className={styles.compare_main_container}>
      <div className={styles.compare_head} />
      <div className={styles.compare_head_wrapper}>
        <h1 className={styles.compare_heading_text}>나의 기업을 선택해 주세요!</h1>
        <div className={styles.add_btn_wrapper}>
          {resetBtnText === "전체 초기화" ? (
            <button className={styles.reset_btn} onClick={handleResetButtonClick}>
              <img src={icRestart} alt="restart" className={styles.ic_restart} />
              {resetBtnText}
            </button>
          ) : (
            <button className={styles.compare_btn} onClick={handleResetButtonClick}>
              다른 기업 비교하기
            </button>
          )}
        </div>
      </div>
      <div>
        <div className={styles.inner_box}>
          {selectedCompanies.length > 0 ? (
            selectedCompanies.map((company, index) => (
              <div key={index}>
                <p>{company.name}</p>
                <p>선택 취소</p>
              </div>
            ))
          ) : (
            <div className={styles.addButtonWrapper}>
              <div className={styles.addButton}></div>
              <img src={btnPlus} alt="add" className={styles.btn_plus} />
              <div className={styles.addButton}></div>
              <p className={styles.add_company_text}>기업 추가</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.btn_wrapper}>
        <button onClick={handleComparisonClick}>기업 비교하기</button>
      </div>
    </div>
  );
}

export default Compare;
