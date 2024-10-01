import React, { useCallback, useEffect, useState } from "react";
import styles from "./StartupList.module.css";
import searchIcon from "../../assets/ic_search.svg";
import dropdownIcon from "../../assets/dropdown.svg";
import Pagination from "../../components/Pagination/Pagination";

function StartupList() {
  const viewCompanyInfoNum = 10;
  const [orderBy, setOrderBy] = useState("investment-high");
  const [dropdown, setDropDown] = useState(false);
  const [company, setCompany] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/allCompanyData.json");
        if (!response.ok) throw new Error("데이터를 불러오지 못 함");
        const data = await response.json();
        console.log("data:", data);
        setCompany(data);
        console.log("company", company);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const totalPages = Math.ceil(companyNum / viewCompanyInfoNum);
  // 임시적으로 정해둔 데이터
  const totalPages = 15;
  const indexOfLastItem = currentPage * viewCompanyInfoNum;
  const indexOfFirstItem = indexOfLastItem - viewCompanyInfoNum;

  const toggleDropdown = () => {
    setDropDown(!dropdown);
  };

  const handleOptionClick = (value) => {
    setOrderBy(value);
    setDropDown(false);
  };

  // if (isLoadedData) return <div>Loading...</div>;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.startupList}>
      <div className={styles.startup_list}>
        <p className={styles.all_startup_list}>전체 스타트업 목록</p>
        <div className={styles.search_sorting}>
          <div className={styles.search}>
            <img className={styles.search_img} src={searchIcon} alt="search icon" />
            <input
              className={styles.search_input}
              placeholder="검색어를 입력해주세요"
              type="text"
            />
          </div>
          <div className={styles.dropdown}>
            <div className={styles.dropdown_select} onClick={toggleDropdown}>
              {orderBy === "investment-high"
                ? "누적 투자 금액 높은순"
                : orderBy === "investment-low"
                ? "누적 투자 금액 낮은순"
                : orderBy === "sales-high"
                ? "매출액 높은순"
                : orderBy === "sales-low"
                ? "매출액 낮은순"
                : orderBy === "employeeNum-high"
                ? "고용 인원 많은순"
                : "고용 인원 적은순"}
              <img className={styles.dropdown_icon} src={dropdownIcon} alt="dropdown" />
            </div>
            {dropdown && (
              <ul className={styles.dropdown_list}>
                <li
                  className={styles.investment_high}
                  onClick={() => handleOptionClick("investment-high")}
                >
                  누적 투자금액 높은순
                </li>
                <li
                  className={styles.investment_low}
                  onClick={() => handleOptionClick("investment-low")}
                >
                  누적 투자금액 낮은순
                </li>
                <li className={styles.sales_high} onClick={() => handleOptionClick("sales-high")}>
                  매출액 높은순
                </li>
                <li className={styles.sales_low} onClick={() => handleOptionClick("sales-low")}>
                  매출액 낮은순
                </li>
                <li
                  className={styles.employeeNum_high}
                  onClick={() => handleOptionClick("employeeNum-high")}
                >
                  고용 인원 많은순
                </li>
                <li
                  className={styles.employeeNum_low}
                  onClick={() => handleOptionClick("employeeNum-low")}
                >
                  고용 인원 적은순
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className={styles.category_box}>
        <ul className={styles.category_kind}>
          <li className={styles.category_header}>
            <span className={styles.category_rank}>순위</span>
            <span className={styles.category_company_name}>기업 명</span>
            <span className={styles.category_company_info}>기업 소개</span>
            <span className={styles.category_category}>카테고리</span>
            <span className={styles.category_investment_amount}>누적 투자 금액</span>
            <span className={styles.category_sales}>매출액</span>
            <span className={styles.category_employee_num}>고용 인원</span>
          </li>
          {company.map((info, index) => {
            <li key={index + indexOfFirstItem} className={styles.category_body}>
              <span className={styles.category_rank}>{index + indexOfFirstItem + 1} 위</span>
              <span className={styles.category_company_name}>{info.name} 억 원</span>
              <span className={styles.category_company_info}>{info.description}</span>
              <span className={styles.category_category}>{info.category}</span>
              <span className={styles.category_investment_amount}>{info.totalInvestment}</span>
              <span className={styles.category_sales}>{info.revenue}</span>
              <span className={styles.category_employee_num}>{info.employees}</span>
            </li>;
          })}
        </ul>
        {/* <div className={styles.pagination}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            <img src={leftArrow} alt="left" />
          </button>
          {renderPaginationList()}
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            <img src={rightArrow} alt="right" />
          </button>
        </div> */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasNext={currentPage < totalPages}
        />
      </div>
    </div>
  );
}

export default StartupList;
