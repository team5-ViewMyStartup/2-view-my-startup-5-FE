import React from "react";
import styles from "./CompareCompany.module.css";
import icRestart from "../../imagesjun/ic_restart.png";
import icRestartWhite from "../../imagesjun/ic_restart_white.svg";
import icAdd from "../../imagesjun/ic_add.png";
import btnPlus from "../../imagesjun/btn_plus.png";
import { useState, useEffect } from "react";
import { companiesMockData } from "./mockData";
import IcSearch from "../../imagesjun/ic_search.png";
import IcCloseX from "../../imagesjun/ic_delete.png";

function CompareCompany() {
  const [resetBtnText, setResetBtnText] = useState("전체 초기화");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [additionalCompanies, setAdditionalCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComparisonVisible, setIsComparisonVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 5;

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
        const companies = companiesMockData;
        setSelectedCompanies(companies.slice(0, 2));
        setAdditionalCompanies(companies.slice(2));
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
     *
     */
    setSelectedCompanies([]);
    setAdditionalCompanies(companiesMockData);
    if (selectedCompanies.length > 1 && additionalCompanies.length > 0) {
      setIsComparisonVisible(true);
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
  const currentCompanies = filteredCompanies.slice(
    (currentPage - 1) * companiesPerPage,
    currentPage * companiesPerPage,
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
  const title = "나의 기업 선택하기";
  const handleClose = closeModal;

  const handleSelect = (companyName) => {
    const companyToAdd = additionalCompanies.find((company) => company.name === companyName);
    setSelectedCompanies([...selectedCompanies, companyToAdd]);
    setAdditionalCompanies(additionalCompanies.filter((company) => company.name !== companyName));
  };

  const handleDeselect = (companyName) => {
    const companyToRemove = selectedCompanies.find((company) => company.name === companyName);
    setSelectedCompanies(selectedCompanies.filter((company) => company.name !== companyName));
    setAdditionalCompanies([...additionalCompanies, companyToRemove]);
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
                  src={IcCloseX}
                  className={styles.ic_close_x}
                  alt="deleteIcon"
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
                  placeholder="검색어를 입력해 주세요"
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

              {searchQuery && (
                <div className={styles.PartitionHug}>
                  <h2 className={styles.CompaniesColumnText}>
                    검색 결과 ({filteredCompanies.length})
                  </h2>
                  {filteredCompanies.length === 0 ? (
                    <div className={styles.noResultsMessage}>검색 결과가 없습니다.</div>
                  ) : (
                    <>
                      <ul className={styles.companyColumnsHug}>
                        {currentCompanies.map((company) => (
                          <li key={company.name} className={styles.companyColumns}>
                            <div className={styles.companyColumnsLogoTextHug}>
                              <img
                                src={company.logoUrl}
                                alt={`${company.name} logo`}
                                className={styles.companyLogo}
                              />
                              <div className={styles.companyColumnsNameCategoryHug}>
                                <div className={styles.companyColumnsName}>{company.name}</div>
                                <div className={styles.companyColumnsCategory}>
                                  {company.category}
                                </div>
                              </div>
                            </div>

                            {selectedCompanies.some(
                              (selected) => selected.name === company.name,
                            ) ? (
                              <button
                                onClick={() => handleDeselect(company.name)}
                                className={styles.selectBtnSelected}
                              >
                                선택완료
                              </button>
                            ) : (
                              <button
                                onClick={() => handleSelect(company.name)}
                                className={styles.selectBtn}
                              >
                                선택하기
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompareCompany;
