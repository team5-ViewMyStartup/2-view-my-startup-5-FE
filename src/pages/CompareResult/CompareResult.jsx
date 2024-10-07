import React, { useEffect, useState } from "react";
import styles from "./CompareResult.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import { companyOptions, rankingOptions } from "../../components/Dropdown/DropdownOption";
import ListHeader from "../../components/List/ListHeader";
import { companyHeader } from "../../components/List/HeaderOption";

function CompareResult() {
  const viewCompanyInfoNum = 5;
  const [compareOrderBy, setCompareOrderBy] = useState("누적 투자금액 높은순");
  const [companyOrderBy, setCompanyOrderBy] = useState("매출액 높은순");
  const [compare, setCompare] = useState([]);
  const [company, setCompany] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);

  useEffect(async () => {
    const response = await fetch("/allCompanyData.json");
    if (!response.ok) throw new Error("데이터를 불러오지 못 함");
    const data = await response.json();
    setCompare(data.sort((a, b) => b.totalInvestment - a.totalInvestment));
    setCompany(data.sort((a, b) => b.revenue - a.revenue));
  }, []);

  const indexOfLastItem = currentPage * viewCompanyInfoNum;
  const indexOfFirstItem = indexOfLastItem - viewCompanyInfoNum;

  useEffect(() => {
    let compareSorted = [...compare];
    switch (compareOrderBy) {
      case "investment-high":
        compareSorted = compareSorted.sort((a, b) => b.totalInvestment - a.totalInvestment);
        break;
      case "investment-low":
        compareSorted = compareSorted.sort((a, b) => a.totalInvestment - b.totalInvestment);
        break;
      case "sales-high":
        compareSorted = compareSorted.sort((a, b) => b.revenue - a.revenue);
        break;
      case "sales-low":
        compareSorted = compareSorted.sort((a, b) => a.revenue - b.revenue);
        break;
      case "employeeNum-high":
        compareSorted = compareSorted.sort((a, b) => b.employees - a.employees);
        break;
      case "employeeNum-low":
        compareSorted = compareSorted.sort((a, b) => a.employees - b.employees);
    }
    setSortedData(compareSorted);
  }, [compare, compareOrderBy]);

  useEffect(() => {
    let companySorted = [...company];
    switch (companyOrderBy) {
      case "sales-high":
        companySorted = companySorted.sort((a, b) => b.revenue - a.revenue);
        break;
      case "sales-low":
        companySorted = companySorted.sort((a, b) => a.revenue - b.revenue);
        break;
      case "employeeNum-high":
        companySorted = companySorted.sort((a, b) => b.employees - a.employees);
        break;
      case "employeeNum-low":
        companySorted = companySorted.sort((a, b) => a.employees - b.employees);
    }
    setSortedData(companySorted);
  }, [company, companyOrderBy]);

  const compareOrderMap = companyOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {});

  const companyOrderMap = rankingOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  });

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
              options={companyOptions}
              selectedOption={compareOrderMap[compareOrderBy] || "누적 투자금액 높은순"}
              onSelect={setCompareOrderBy}
              isCompanyOptions={true}
            />
          </div>
        </div>
        <ListHeader headers={companyHeader} type="company" />
        <div className={styles.category_box_compare}>
          <ul className={styles.category_kind_compare}>
            {sortedData.slice(indexOfFirstItem, indexOfLastItem).map((info, index) => (
              <li key={index + indexOfFirstItem} className={styles.category_body}>
                <span className={styles.category_rank}>{index + indexOfFirstItem + 1}위</span>
                <span className={styles.category_company_name}>{info.name}</span>
                <span className={styles.category_company_info}>{info.description}</span>
                <span className={styles.category_category}>{info.category}</span>
                <span className={styles.category_investment_amount}>
                  {info.totalInvestment}억 원
                </span>
                <span className={styles.category_sales}>{info.revenue}억 원</span>
                <span className={styles.category_employee_num}>{info.employees}명</span>
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
              options={rankingOptions}
              selectedOption={companyOrderMap[companyOrderBy] || "매출액 높은순"}
              onSelect={setCompanyOrderBy}
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
                <span className={styles.category_investment_amount}>
                  {info.totalInvestment}억 원
                </span>
                <span className={styles.category_sales}>{info.revenue}억 원</span>
                <span className={styles.category_employee_num}>{info.employees}명</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.my_company_investment}>
        <button className={styles.investment_button}>나의 기업에 투자하기</button>
      </div>
    </div>
  );
}

export default CompareResult;
