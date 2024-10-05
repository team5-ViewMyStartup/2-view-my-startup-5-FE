import React from "react";
import styles from "./Compare.module.css";
import icRestart from "../../imagesjun/ic_restart.png";
import icRestartWhite from "../../imagesjun/ic_restart_white.svg";
import icAdd from "../../imagesjun/ic_add.png";
import btnPlus from "../../imagesjun/btn_plus.png";
import { useState, useEffect } from "react";

function Compare() {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [additionalCompanies, setAdditionalCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getCompanies = async () => {
      // TODO: API를 통해 기업 데이터를 가져오기
      // try {
      //   const companies = await fetchCompanies();
      //   setSelectedCompanies(companies);
      // } catch (error) {
      //   console.error("기업 데이터를 가져오는데 실패했습니다.", error);
      // }
    };
    getCompanies();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleResetButtonClick = () => {
    /*TODO
     * 핸들러
     *초기화 기능 구현
     */
    if (selectedCompanies.length > 0 && additionalCompanies.length > 0) {
      // setResetButtonText("다른 기업 비교하기");
    }
  };

  const handleComparisonClick = () => {
    /*TODO
     *
     *비교 기능 구현
     */
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.compare_main_container}>
      <div className={styles.compare_head} />
      <div className={styles.compare_head_wrapper}>
        <h1 className={styles.compare_heading_text}>나의 기업을 선택해 주세요!</h1>
        <div className={styles.reset_btn_wrapper}>
          <button className={styles.reset_btn} onClick={handleResetButtonClick}>
            <img src={icRestartWhite} alt="restart" className={styles.ic_restart} />
            전체 초기화
          </button>
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
            <div className={styles.add_button_wrapper}>
              <div className={styles.modal_button} onClick={openModal}>
                <img src={btnPlus} alt="add" className={styles.add_company_btn} />
                <p className={styles.add_company_text}>기업 추가</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.compare_head_wrapper}>
        <h1 className={styles.compare_heading_text}>어떤 기업이 궁금하세요?</h1>
        <p> (최대 5개)</p>
        <div className={styles.reset_btn_wrapper}>
          <button className={styles.reset_btn} onClick={handleComparisonClick}>
            기업 추가하기
          </button>
        </div>
      </div>

      <div>
        <div className={styles.inner_box}></div>
      </div>

      <div className={styles.btn_wrapper}>
        <button className={styles.reset_btn} onClick={handleComparisonClick}>
          기업 비교하기
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_header}>
            {" "}
            <span>비교할 기업 선택하기</span>
            <button className={styles.close_btn} onClick={closeModal}>
              {" "}
              &times;
            </button>
          </div>
          <div className={styles.search_input_container}>
            {" "}
            <span className={styles.search_icon}>&#128269;</span>
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Compare;
