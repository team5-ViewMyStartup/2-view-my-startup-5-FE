import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./ComparePage.module.css";
import { fetchCompanyData, fetchCompareData } from "../../api/api";

const S3_BASE_URL = process.env.REACT_APP_S3_BASE_URL;

function ComparePage() {
  const navigate = useNavigate();
  const [isMyModalOpen, setIsMyModalOpen] = useState(false);
  const [isMyCompanyModalInput, setIsMyCompanyModalInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [bottomSearchQuery, setBottomSearchQuery] = useState("");
  const [company, setCompany] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMyCompany, setSelectedMyCompany] = useState(null);

  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCompareCompanyModalInput, setIsCompareCompanyModalInput] = useState("");
  const [selectedCompareCompany, setSelectedCompareCompany] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [recentCompanies, setRecentCompanies] = useState([]);

  const VIEW_COMPANY_INFO_NUM = 5;

  const indexOfLastItem = currentPage * VIEW_COMPANY_INFO_NUM;
  const indexOfFirstItem = indexOfLastItem - VIEW_COMPANY_INFO_NUM;

  const openMyModal = () => {
    setIsMyModalOpen(true);

    const storedRecentCompanies = JSON.parse(localStorage.getItem("recentCompanies")) || [];
    setRecentCompanies(storedRecentCompanies);
  };

  const closeMyModal = () => {
    setIsMyModalOpen(false);
  };

  const openCompareModal = () => {
    setIsCompareModalOpen(true);
  };

  const closeCompareModal = () => {
    setIsCompareModalOpen(false);
    setErrorMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
      setIsMyCompanyModalInput(e.target.value);
    }
  };

  const handleInputChange = (e) => {
    setIsMyCompanyModalInput(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleBottomKeyDown = (e) => {
    setBottomSearchQuery(e.target.value);
    setIsCompareCompanyModalInput(e.target.value);
  };

  const handleBottomInputChange = (e) => {
    setIsCompareCompanyModalInput(e.target.value);
    setBottomSearchQuery(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectedMyCompany = (info) => {
    setSelectedMyCompany(info);
    closeMyModal();
    updateRecentCompanies(info);
  };

  const handleSelectedCompareCompany = (info) => {
    if (info.id === selectedMyCompany?.id) {
      setErrorMessage("*이미 나의 기업으로 선택한 기업입니다.");
    } else if (selectedCompareCompany.length < 5 && !selectedCompareCompany.includes(info)) {
      setSelectedCompareCompany((prev) => [...prev, info]);
      setErrorMessage("");
    } else {
      setErrorMessage("*비교할 기업은 최대 5개까지 선택 가능합니다."); // 최대 선택 기업 수 초과 시 오류 메시지 설정
    }
  };

  const handleRemoveCompareCompany = (info) => {
    setSelectedCompareCompany((prev) => prev.filter((company) => company !== info));
  };

  const handleCancelMySelect = () => {
    setSelectedMyCompany(null);
  };

  const handleCancelCompareSelect = (info) => {
    setSelectedCompareCompany((prev) => prev.filter((company) => company !== info));
  };

  const handleAllReset = () => {
    setSelectedMyCompany(null);
    setSelectedCompareCompany([]);
    setSearchQuery("");
    setBottomSearchQuery("");
  };

  const handleTextReset = () => {
    setSearchQuery("");
    setBottomSearchQuery("");
    setIsCompareCompanyModalInput("");
    setIsMyCompanyModalInput("");

    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
  };

  const handleCompare = async () => {
    const selectedCompanies = selectedCompareCompany.map((company) => {
      return company.id;
    });

    const queryStrings = new URLSearchParams();
    queryStrings.append("baseCompanyId", selectedMyCompany.id);

    selectedCompanies.forEach((id) => {
      queryStrings.append("compareCompanyId", id);
    });
    navigate(`/compare-result?${queryStrings.toString()}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCompanyData();
      setCompany(data.sort((a, b) => a.name.localeCompare(b.name)));
    };
    fetchData();
  }, []);

  const filteredCompanies = company.filter((info) =>
    info.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const compareFilteredCompanies = company.filter((info) =>
    info.name.toLowerCase().includes(bottomSearchQuery.toLowerCase()),
  );

  const updateRecentCompanies = (selectedCompany) => {
    let recentCompanies = JSON.parse(localStorage.getItem("recentCompanies")) || [];
    recentCompanies = recentCompanies.filter((company) => company.id !== selectedCompany.id);
    recentCompanies.unshift(selectedCompany);
    if (recentCompanies.length > 5) {
      recentCompanies = recentCompanies.slice(0, 5);
    }
    localStorage.setItem("recentCompanies", JSON.stringify(recentCompanies));
  };

  return (
    <div className={styles.compare_page}>
      <div className={styles.not_modal_page}>
        <div className={styles.compare_page_header}>
          <p className={styles.select_company_text}>나의 기업을 선택해 주세요!</p>
          <div className={styles.all_reset}>
            <button
              className={styles.all_reset_btn}
              disabled={selectedMyCompany === null || selectedCompareCompany.length < 1}
              onClick={handleAllReset}
            >
              <img
                src={`${S3_BASE_URL}/restart.svg`}
                className={styles.restart_img}
                alt="restart image"
              />
              전체 초기화
            </button>
          </div>
        </div>

        <div className={styles.select_my_company_box}>
          {selectedMyCompany ? (
            <>
              <p className={styles.cancel_select} onClick={handleCancelMySelect}>
                선택 취소
              </p>
              <div className={styles.selected_company_info}>
                <img className={styles.selected_company_img} src={selectedMyCompany.image} />
                <p className={styles.selected_company_name}>{selectedMyCompany.name}</p>
                <p className={styles.selected_company_category}>{selectedMyCompany.category}</p>
              </div>
            </>
          ) : (
            <div className={styles.select_my_company_container}>
              <div className={styles.add_company}>
                <img
                  src={`${S3_BASE_URL}/btn_plus.svg`}
                  className={styles.plus_icon}
                  onClick={openMyModal}
                />
                <p className={styles.add_company_text}>기업 추가</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {isMyModalOpen && (
        <div className={styles.yes_modal}>
          <div className={styles.modal}>
            <div className={styles.modal_header}>
              <p className={styles.select_my_company}>나의 기업 선택하기</p>
              <img
                src={`${S3_BASE_URL}/closed.svg`}
                className={styles.close_icon}
                onClick={closeMyModal}
              />
            </div>
            <div className={styles.search_bar}>
              <input
                className={styles.search_input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              {isMyCompanyModalInput && (
                <img
                  src={`${S3_BASE_URL}/reset.svg`}
                  className={styles.reset_icon}
                  onClick={handleTextReset}
                />
              )}
              <img src={`${S3_BASE_URL}/search_icon.svg`} className={styles.search_icon} />
            </div>
            <div className={styles.all_company}>
              {recentCompanies.length > 0 && (
                <>
                  <div className={styles.recent_company_header}>
                    <p className={styles.recent_company_title}>최근 선택된 기업</p>
                    <p className={styles.recent_company_num}>({recentCompanies.length})</p>
                  </div>
                  <div className={styles.recent_company_body}>
                    <ul className={styles.recent_company_list}>
                      {recentCompanies.map((company, index) => (
                        <li key={index} className={styles.recent_company_item}>
                          <div className={styles.gap}>
                            <img
                              src={company.image}
                              className={styles.codeit_icon}
                              alt={company.name}
                            />
                            <span className={styles.category_company_name}>{company.name}</span>
                            <span className={styles.category_category}>{company.category}</span>
                          </div>
                          <button
                            className={styles.selected_button}
                            onClick={() => handleSelectedMyCompany(company)}
                          >
                            선택하기
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              <hr />
              <div className={styles.all_company_header}>
                {isMyCompanyModalInput ? (
                  <p className={styles.search_result}>검색 결과</p>
                ) : (
                  <p className={styles.all_company_list_text}>전체 기업 리스트</p>
                )}
                <p className={styles.all_company_num}>({filteredCompanies.length})</p>
              </div>

              <div className={styles.all_company_list_container}>
                <ul className={styles.all_company_list}>
                  {filteredCompanies.slice(indexOfFirstItem, indexOfLastItem).map((info, index) => (
                    <li key={index + indexOfFirstItem} className={styles.all_company_list_body}>
                      <div className={styles.gap}>
                        <img src={info.image} className={styles.codeit_icon} />
                        <span className={styles.category_company_name}>{info.name}</span>
                        <span className={styles.category_category}>{info.category}</span>
                      </div>
                      <button
                        className={styles.selected_button}
                        onClick={() => handleSelectedMyCompany(info)}
                      >
                        선택하기
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredCompanies.length / VIEW_COMPANY_INFO_NUM)}
              onPageChange={handlePageChange}
              hasNext={currentPage < Math.ceil(filteredCompanies.length / VIEW_COMPANY_INFO_NUM)}
              type="small"
            />
          </div>
        </div>
      )}
      {selectedMyCompany && (
        <div className={styles.compare_company_select_page}>
          <div className={styles.compare_company_select_page_header}>
            <p className={styles.select_compare_company_text}>어떤 기업이 궁금하세요?</p>
            <button
              className={styles.add_company_btn}
              onClick={openCompareModal}
              disabled={selectedCompareCompany.length >= 5}
            >
              기업 추가하기
            </button>
          </div>

          <div className={styles.select_compare_company_container}>
            {selectedCompareCompany < 1 ? (
              <div className={styles.select_compare_company_box}>
                <p className={styles.not_select_compare_company_text}>
                  아직 추가한 기업이 없어요.
                  <br />
                  버튼을 눌러 기업을 추가해보세요!
                </p>
              </div>
            ) : (
              selectedCompareCompany.map((info, index) => (
                <div key={index} className={styles.selected_company}>
                  <img
                    src={`${S3_BASE_URL}/company_close_icon.svg`}
                    className={styles.delete_company_btn}
                    onClick={() => handleRemoveCompareCompany(info)}
                  />
                  <div className={styles.selected_company_body}>
                    <img src={info.image} className={styles.selected_company_img} />
                    <span className={styles.company_name}>{info.name}</span>
                    <span className={styles.company_category}>{info.category}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {isCompareModalOpen && (
            <div className={styles.yes_compare_modal}>
              <div className={styles.compare_modal}>
                <div className={styles.compare_modal_header}>
                  <p className={styles.select_compare_company}>비교할 기업 선택하기</p>
                  <img
                    src={`${S3_BASE_URL}/closed.svg`}
                    className={styles.close_icon}
                    onClick={closeCompareModal}
                  />
                </div>
                <div className={styles.search_bar}>
                  <input
                    className={styles.search_input}
                    onChange={handleBottomInputChange}
                    onKeyDown={handleBottomKeyDown}
                  />
                  {isCompareCompanyModalInput && (
                    <img
                      src={`${S3_BASE_URL}/reset.svg`}
                      className={styles.reset_icon}
                      onClick={handleTextReset}
                    />
                  )}
                  <img src={`${S3_BASE_URL}/search_icon.svg`} className={styles.search_icon} />
                </div>
                {selectedCompareCompany && (
                  <div className={styles.selected_company_list}>
                    <div className={styles.selected_company_list_header}>
                      <p className={styles.selected_company_text}>선택한 기업</p>
                      <p className={styles.selected_company_num}>
                        ({selectedCompareCompany.length})
                      </p>
                    </div>
                    <div className={styles.selected_company_list_container}>
                      <ul className={styles.selected_company_list_box}>
                        {selectedCompareCompany.map((info, index) => (
                          <li
                            key={index + indexOfFirstItem}
                            className={styles.selected_company_list_body}
                          >
                            <div className={styles.gap}>
                              <img src={info.image} className={styles.codeit_icon} />
                              <span className={styles.category_company_name}>{info.name}</span>
                              <span className={styles.category_category}>{info.category}</span>
                            </div>
                            <button
                              className={styles.cancel_selected}
                              onClick={() => handleCancelCompareSelect(info)}
                            >
                              선택 해제
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <hr />
                <div className={styles.all_company}>
                  <div className={styles.all_company_header}>
                    {isCompareCompanyModalInput ? (
                      <p className={styles.search_result}>검색 결과</p>
                    ) : (
                      <p className={styles.all_company_list_text}>전체 비교 기업 리스트</p>
                    )}
                    <p className={styles.all_company_num}>({compareFilteredCompanies.length})</p>
                  </div>
                  <div className={styles.all_company_list_container}>
                    <ul className={styles.all_company_list}>
                      {compareFilteredCompanies
                        .slice(indexOfFirstItem, indexOfLastItem)
                        .map((info, index) => (
                          <li
                            key={index + indexOfFirstItem}
                            className={styles.all_company_list_body}
                          >
                            <div className={styles.gap}>
                              <img src={info.image} className={styles.codeit_icon} />
                              <span className={styles.category_company_name}>{info.name}</span>
                              <span className={styles.category_category}>{info.category}</span>
                            </div>
                            <button
                              className={`${styles.selected_button} ${
                                selectedCompareCompany.includes(info) || selectedMyCompany === info
                                  ? styles.selected
                                  : ""
                              }`}
                              onClick={() => {
                                if (
                                  selectedCompareCompany.length >= 5 ||
                                  selectedMyCompany === info
                                ) {
                                  handleSelectedCompareCompany(info);
                                } else {
                                  handleSelectedCompareCompany(info);
                                }
                              }}
                            >
                              {selectedCompareCompany.includes(info) ||
                              selectedMyCompany === info ? (
                                <>
                                  <img
                                    src={`${S3_BASE_URL}/check.svg`}
                                    alt="check icon"
                                    className={styles.check_icon}
                                  />
                                  선택완료
                                </>
                              ) : (
                                "선택하기"
                              )}
                            </button>
                          </li>
                        ))}
                    </ul>
                    {errorMessage && <div className={styles.error_message}>{errorMessage}</div>}
                  </div>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(compareFilteredCompanies.length / VIEW_COMPANY_INFO_NUM)}
                  onPageChange={handlePageChange}
                  hasNext={
                    currentPage < Math.ceil(compareFilteredCompanies.length / VIEW_COMPANY_INFO_NUM)
                  }
                  type="small"
                />
              </div>
            </div>
          )}
        </div>
      )}

      <button
        className={styles.compare_company_btn}
        disabled={selectedMyCompany === null || selectedCompareCompany.length < 1}
        onClick={handleCompare}
      >
        기업 비교하기
      </button>
    </div>
  );
}

export default ComparePage;
