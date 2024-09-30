import React from "react";
import styles from "./Compare.module.css";
import icRestart from "../../imagesjun/ic_restart.png";
import icAdd from "../../imagesjun/ic_add.png";
import btnPlus from "../../imagesjun/btn_plus.png";
import { useState, useEffect } from "react";

function Compare() {
  /*TODO
   *상태관리
   */
  const [resetBtnText, setResetBtnText] = useState("전체 초기화");
  const [isCompareButtonEnabled, setIsCompareButtonEnabled] = useState(true);
  const [isComparisonVisible, setIsComparisonVisible] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [additionalCompanies, setAdditionalCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sampleCompanies = [
    { id: 1, name: "삼성전자" },
    { id: 2, name: "LG전자" },
    { id: 3, name: "현대자동차" },
    { id: 4, name: "카카오" },
    { id: 5, name: "네이버" },
  ];

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
    console.log("열려라 참달!");
  };
  const closeModal = () => {
    setIsModalOpen(false);
    console.log("닫혀라 모께!");
  };

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
            <img src={icRestart} alt="restart" className={styles.ic_restart} />
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

      <div className={styles.btn_wrapper}>
        <button onClick={handleComparisonClick}>기업 비교하기</button>
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
