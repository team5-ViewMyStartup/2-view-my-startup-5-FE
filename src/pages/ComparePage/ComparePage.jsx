/**
 * TODO
 * 1. pagination type 지정해서 비교페이지에서만 32px로 지정
 */

import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./ComparePage.module.css";
import plus from "../../assets/btn_plus.svg";
import restart from "../../assets/ic_restart.svg";
import close from "../../assets/close.svg";
import reset from "../../assets/ic_delete_circle_small.svg";
import search from "../../assets/ic_search.svg";
import codeitIcon from "../../assets/icon_codeit.jpg";

function ComparePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInput, setIsInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [company, setCompany] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const viewCompanyInfoNum = 5;

  const totalPages = Math.ceil(company.length / viewCompanyInfoNum);
  const indexOfLastItem = currentPage * viewCompanyInfoNum;
  const indexOfFirstItem = indexOfLastItem - viewCompanyInfoNum;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
      setIsInput(e.target.value);
    }
  };

  const handleInputChange = (event) => {
    setIsInput(event.target.value);
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectedCompany = (info) => {
    setSelectedCompany(info);
    closeModal();
  };

  const handleCancelSelect = () => {
    setSelectedCompany(null); // 선택된 기업 초기화
  };

  useEffect(async () => {
    const response = await fetch("/allCompanyData.json");
    if (!response.ok) throw new Error("데이터를 불러오지 못 함");
    const data = await response.json();
    setCompany(data.sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const filteredCompanies = company.filter((info) =>
    info.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={styles.compare_page}>
      <div className={styles.not_modal_page}>
        <div className={styles.compare_page_header}>
          <p className={styles.select_company_text}>나의 기업을 선택해 주세요!</p>
          <div className={styles.all_reset}>
            <button className={styles.all_reset_btn} disabled={selectedCompany === null}>
              <img src={restart} className={styles.restart_img} alt="restart image" />
              전체 초기화
            </button>
          </div>
        </div>

        <div className={styles.select_my_company_box}>
          {selectedCompany ? (
            <>
              <p className={styles.cancel_select} onClick={handleCancelSelect}>
                선택 취소
              </p>
              <div className={styles.selected_company_info}>
                <img className={styles.selected_company_img} src={codeitIcon} />
                <p className={styles.selected_company_name}>{selectedCompany.name}</p>
                <p className={styles.selected_company_category}>{selectedCompany.category}</p>
              </div>
            </>
          ) : (
            <div className={styles.select_my_company_container}>
              <div className={styles.add_company}>
                <img src={plus} className={styles.plus_icon} onClick={openModal} />
                <p className={styles.add_company_text}>기업 추가</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.yes_modal}>
          <div className={styles.modal}>
            <div className={styles.modal_header}>
              <p className={styles.select_my_company}>나의 기업 선택하기</p>
              <img src={close} className={styles.close_icon} onClick={closeModal} />
            </div>
            <div className={styles.search_bar}>
              <input
                className={styles.search_input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              {isInput && <img src={reset} className={styles.reset_icon} />}
              <img src={search} className={styles.search_icon} />
            </div>
            <div className={styles.all_company}>
              <div className={styles.all_company_header}>
                <p className={styles.all_company_list_text}>전체 기업 리스트</p>
                <p className={styles.all_company_num}>({filteredCompanies.length})</p>
              </div>
              <div className={styles.all_company_list_container}>
                <ul className={styles.all_company_list}>
                  {filteredCompanies.slice(indexOfFirstItem, indexOfLastItem).map((info, index) => (
                    <li key={index + indexOfFirstItem} className={styles.all_company_list_body}>
                      <div className={styles.gap}>
                        <img src={codeitIcon} className={styles.codeit_icon} />
                        <span className={styles.category_company_name}>{info.name}</span>
                        <span className={styles.category_category}>{info.category}</span>
                      </div>
                      <button
                        className={styles.selected_button}
                        onClick={() => handleSelectedCompany(info)}
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
              totalPages={Math.ceil(filteredCompanies.length / viewCompanyInfoNum)}
              onPageChange={handlePageChange}
              hasNext={currentPage < Math.ceil(filteredCompanies.length / viewCompanyInfoNum)}
            />
          </div>
        </div>
      )}
      <button className={styles.compare_company_btn} disabled={selectedCompany === null}>
        기업 비교하기
      </button>
    </div>
  );
}

export default ComparePage;
