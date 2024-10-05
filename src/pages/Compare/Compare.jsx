import React, { useEffect, useState } from "react";
import styles from "./Compare.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import { compareOptions } from "../../components/Dropdown/DropdownOption";
import ListHeader from "../../components/List/ListHeader";
import { companyHeader } from "../../components/List/HeaderOption";

function Compare() {
  const viewCompanyInfoNum = 5;
  const [orderBy, setOrderBy] = useState("누적 투자금액 높은순");
  const [compare, setCompare] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);

  useEffect(async () => {
    const response = await fetch("/allCompanyData.json");
    if (!response.ok) throw new Error("데이터를 불러오지 못 함");
    const data = await response.json();
    setCompare(data.sort((a, b) => b.totalInvestment - a.totalInvestment));
  }, []);

  const totalPages = Math.ceil(compare.length / viewCompanyInfoNum);
  const indexOfLastItem = currentPage * viewCompanyInfoNum;
  const indexOfFirstItem = indexOfLastItem - viewCompanyInfoNum;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    let sorted = [...compare];
    switch (orderBy) {
      case "investment-high":
        sorted = sorted.sort((a, b) => b.totalInvestment - a.totalInvestment);
        break;
      case "investment-low":
        sorted = sorted.sort((a, b) => a.totalInvestment - b.totalInvestment);
        break;
      case "sales-high":
        sorted = sorted.sort((a, b) => b.revenue - a.revenue);
        break;
      case "sales-low":
        sorted = sorted.sort((a, b) => a.revenue - b.revenue);
        break;
      case "employeeNum-high":
        sorted = sorted.sort((a, b) => b.employees - a.employees);
        break;
      case "employeeNum-low":
        sorted = sorted.sort((a, b) => a.employees - b.employees);
    }
    setSortedData(sorted);
  }, [compare, orderBy]);

  const orderMap = compareOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {});

  return (
    <div className={styles.selected_company_result}>
      <div className={styles.selected_company_result_header}>
        <p className={styles.selected_company_text}>내가 선택한 기업</p>
        <div className={styles.selected_compare_button}>
          <button className={styles.compare_button}>다른 기업 비교하기</button>
        </div>
      </div>
      <div className={styles.selected_company_box}>
        <p className={styles.company_name}>테슬라</p>
        <p className={styles.company_category}>자동차</p>
      </div>
      <div className={styles.selected_company_result_middle}>
        <div className={styles.selected_company_middle_header}>
          <p className={styles.compare_result_check}>비교 결과 확인하기</p>
          <div className={styles.dropdown}>
            <Dropdown
              options={compareOptions}
              selectedOption={orderMap[orderBy] || "누적 투자금액 높은순"}
              onSelect={setOrderBy}
              isCompanyOptions={true}
            />
          </div>
        </div>
        <ListHeader headers={companyHeader} type="company" />
        <div className={styles.category_box_compare}>
          <ul className={styles.category_kind_compare}>
            {sortedData.slice(indexOfFirstItem, indexOfLastItem).map((info, index) => (
              <li key={index + indexOfFirstItem} className={styles.category_body}>
                <span className={styles.category_rank}>{index + indexOfFirstItem + 1} 위</span>
                <span className={styles.category_company_name}>{info.name}</span>
                <span className={styles.category_company_info}>{info.description}</span>
                <span className={styles.category_category}>{info.category}</span>
                <span className={styles.category_investment_amount}>{info.totalInvestment}</span>
                <span className={styles.category_sales}>{info.revenue}</span>
                <span className={styles.category_employee_num}>{info.employees}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.selected_company_bottom}>
        <div className={styles.selected_company_bottom_header}>
          <p className={styles.company_rank_check}>기업 순위 확인하기</p>
          <div className={styles.dropdown}>
            <Dropdown
              options={compareOptions}
              selectedOption={orderMap[orderBy] || "누적 투자금액 높은순"}
              onSelect={setOrderBy}
              isCompanyOptions={true}
            />
          </div>
        </div>
        <ListHeader headers={companyHeader} type="company" />
        <div className={styles.category_box_rank}>
          <ul className={styles.category_kind_rank}>
            {sortedData.slice(indexOfFirstItem, indexOfLastItem).map((info, index) => (
              <li key={index + indexOfFirstItem} className={styles.category_body}>
                <span className={styles.category_rank}>{index + indexOfFirstItem + 1} 위</span>
                <span className={styles.category_company_name}>{info.name}</span>
                <span className={styles.category_company_info}>{info.description}</span>
                <span className={styles.category_category}>{info.category}</span>
                <span className={styles.category_investment_amount}>{info.totalInvestment}</span>
                <span className={styles.category_sales}>{info.revenue}</span>
                <span className={styles.category_employee_num}>{info.employees}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Compare;
