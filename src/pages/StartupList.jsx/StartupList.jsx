import React, { useEffect, useState } from "react";
import styles from "./StartupList.module.css";
import searchIcon from "../../assets/ic_search.svg";
import dropdownIcon from "../../assets/dropdown.svg";

function StartupList() {
  const viewCompanyNum = 10;

  const [orderBy, setOrderBy] = useState("investment-high");
  const [dropdown, setDropDown] = useState(false);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    fetch("/allCompanyData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터 불러오지 못함");
        }
        return response.json();
      })
      .then((data) => setCompany(data[0]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const toggleDropdown = () => {
    setDropDown(!dropdown);
  };

  const handleOptionClick = (value) => {
    setOrderBy(value);
    setDropDown(false);
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
          {/* {company &&
            company.results.map((info) => (
              <li>
                <span>{info.name}</span>
                <span>{info.description}</span>
                <span>{info.category}</span>
                <span>{info.totalInvestment}</span>
                <span>{info.revenue}</span>
                <span>{info.employees}</span>
              </li>
            ))} */}
        </ul>
      </div>
    </div>
  );
}

export default StartupList;
