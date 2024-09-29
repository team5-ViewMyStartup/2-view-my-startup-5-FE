import React from "react";
import styles from "./Compare.module.css";
import icRestart from "../../imagesjun/ic_restart.png";
import btn_plus from "../../imagesjun/btn_plus.png";
import { useState } from "react";

function Compare() {
  /*TODO
   *상태관리 추리
   */
  const [resetBtnText, setResetBtnText] = useState("전체 초기화");
  const [isCompareButtonEnabled, setIsCompareButtonEnabled] = useState(true);

  const handleResetButtonClick = () => {
    setResetBtnText("초기화 완료");
    /*TODO
     * 핸들러
     *초기화 기능 구현
     */
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
      <div className={styles.compare_content}>
        <div className={styles.compare_head_Wrapper}>
          <h1 className={styles.compare_heading_text}>비교할 기업 선택해주삼!</h1>
          <div className={styles.add_btn_wrapper}>
            {resetBtnText === "전체 초기화" ? (
              <button className={styles.resetBtn} onClick={handleResetButtonClick}>
                <img src={icRestart} alt="restart" className={styles.icRestart} />
                {resetBtnText}
              </button>
            ) : (
              <button className={styles.compareOtherBtn} onClick={handleResetButtonClick}>
                다른 기업 비교하기
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.btnWrapper}>
        <button
          className={isCompareButtonEnabled ? styles.activeBtn : styles.disabledBtn}
          disabled={!isCompareButtonEnabled}
          onClick={handleComparisonClick}
        >
          기업 비교하기
        </button>
      </div>
    </div>
  );
}

export default Compare;
