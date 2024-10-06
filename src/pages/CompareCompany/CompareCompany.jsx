import React from "react";
import styles from "./CompareCompany.module.css";
import icRestart from "../../imagesjun/ic_restart.png";
import icRestartWhite from "../../imagesjun/ic_restart_white.svg";
import icAdd from "../../imagesjun/ic_add.png";
import btnPlus from "../../imagesjun/btn_plus.png";
import { useState, useEffect } from "react";
import { companiesMockData } from "./mockData";
import IcSearch from "../../imagesjun/ic_search.png";
import IcDelet from "../../imagesjun/ic_delete.png";

function CompareCompany() {
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

  useEffect(() => {
    const getCompanies = async () => {
      // TODO: API를 통해 기업 데이터를 가져오기
      // try {
      //   const companies = await fetchCompanies();
      //   setSelectedCompanies(companies);
      // } catch (error) {
      //   console.error("기업 데이터를 가져오는데 실패했습니다.", error);
      // }
      try {
        const companies = companiesMockData; // 목데이터를 가져옴
        setSelectedCompanies(companies.slice(0, 2)); // 처음 2개 기업을 선택한 상태로 설정
        setAdditionalCompanies(companies.slice(2)); // 나머지 기업을 추가 기업으로 설정
      } catch (error) {
        alert("실패");
        console.error("기업 데이터를 가져오는데 실패했습니다.", error);
      }
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
    setResetBtnText("초기화 완료");
    /*TODO
     * 핸들러
     *초기화 기능 구현
     */
    setSelectedCompanies([]); // 선택된 기업 리스트 초기화
    setAdditionalCompanies(companiesMockData);
    if (selectedCompanies.length > 1 && additionalCompanies.length > 0) {
      setIsComparisonVisible(true);
      // setResetButtonText("다른 기업 비교하기");
    }
  };

  const handleComparisonClick = () => {
    /*TODO
     *
     *비교 기능 구현
     */
    if (selectedCompanies.length > 0) {
      console.log("Selected companies:", selectedCompanies);
      console.log("Added companies:", additionalCompanies);
      console.log("starting comparison...");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCompanies = additionalCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const [selectedCompanyImage, setSelectedCompanyImage] = useState(null);
  const addCompany = (companyToAdd) => {
    if (selectedCompanies.length < 5) {
      setSelectedCompanies([...selectedCompanies, companyToAdd]);
      setSelectedCompanyImage(companyToAdd.image); // 선택된 기업의 이미지를 설정
      setAdditionalCompanies(
        additionalCompanies.filter((company) => company.name !== companyToAdd.name),
      );
      closeModal();
    } else {
      alert("최대 5개 기업만 선택할 수 있습니다.");
    }
  };
  const title = "나의 기업 선택하기"; // 임의로 제목 설정
  const deleteIcon = IcDelet; // delete 아이콘으로 사용할 이미지 경로
  const handleClose = closeModal; // 모달을 닫는 함수

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
                <button className={styles.cancel_btn} onClick={handleResetButtonClick}>
                  선택 취소
                </button>
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
          <div className={styles.modal_content_wrapper}>
            <div className={styles.modal_content}>
              <div className={styles.modal_header}>
                {title}
                <img
                  src={IcDelet}
                  className={styles.ic_delete}
                  alt="deleteLogo"
                  onClick={handleClose}
                />
              </div>

              {/* <h2>나의 기업 선택하기</h2>
            <button className={styles.close_btn} onClick={closeModal}>
              &times;
            </button>*/}

              {/* Inline Search Bar */}
              <div className={styles.search_container}>
                <input
                  type="text"
                  placeholder="기업 검색..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={styles.search_input}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className={styles.clear_btn}>
                    &times;
                  </button>
                )}
              </div>

              <div className={styles.company_list}>
                {filteredCompanies.map((company) => (
                  <div key={company.name} className={styles.company_item}>
                    <img src={company.image} alt={company.name} className={styles.company_logo} />
                    <p>{company.name}</p>
                    <button
                      className={`${styles.selectBtn} ${
                        selectedCompanies.includes(company)
                          ? styles.selectBtnSelected
                          : styles.selectBtnDeselected
                      }`}
                      onClick={() => addCompany(company)}
                    >
                      {selectedCompanies.includes(company) ? "선택됨" : "선택"}
                    </button>
                  </div>
                ))}
                {filteredCompanies.length === 0 && <p>검색 결과가 없습니다.</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CompareCompany;
