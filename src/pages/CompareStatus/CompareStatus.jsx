import React, { useState, useEffect } from "react";
import styles from "./CompareStatus.module.css";
import { compareOptions } from "../../components/Dropdown/DropdownOption";
import ListHeader from "../../components/List/ListHeader";
import { companyHeader } from "../../components/List/HeaderOption";
import Pagination from "../../components/Pagination/Pagination";
import Dropdown from "../../components/Dropdown/Dropdown";

function Compare() {
  const viewCompanyInfoNum = 10;
  const [orderBy, setOrderBy] = useState("나의 기업 선택 횟수 높은순");
  const [compare, setCompare] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);

  useEffect(async () => {
    const response = await fetch("/allCompanyData.json");
    if (!response.ok) throw new Error("데이터를 불러오지 못 함");
    const data = await response.json();
    setCompare(data.sort((a, b) => b.selectionNum - a.selectionNum));
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
      case "selection-high":
        sorted = sorted.sort((a, b) => b.selectionNum - a.selectionNum);
        break;
      case "selection-low":
        sorted = sorted.sort((a, b) => a.selectionNum - b.selectionNum);
        break;
      case "actual-investment-high":
        sorted = sorted.sort((a, b) => b.totalInvestment - a.totalInvestment);
        break;
      case "actual-investment-low":
        sorted = sorted.sort((a, b) => a.totalInvestment - b.totalInvestment);
    }
    setSortedData(sorted);
  }, [compare, orderBy]);

  const orderMap = compareOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {});

  return (
    <div className={styles.compare}>
      <div className={styles.compare_header}>
        <p className={styles.compare_status}>비교 현황</p>
        <div className={styles.dropdown}>
          <Dropdown
            options={compareOptions}
            selectedOption={orderMap[orderBy] || "나의 기업 선택 횟수 높은순"}
            onSelect={setOrderBy}
            isCompanyOptions={false}
          />
        </div>
      </div>
      <ListHeader headers={companyHeader} type="company" />
      <div className={styles.compare_body}>
        <ul className={styles.category_classification}>
          {sortedData.slice(indexOfFirstItem, indexOfLastItem).map((info, index) => (
            <li key={index + indexOfFirstItem} className={styles.category_body}>
              <span className={styles.category_rank}>{index + indexOfFirstItem + 1} 위</span>
              <span className={styles.category_company_name}>{info.name}</span>
              <span className={styles.category_company_info}>{info.description}</span>
              <span className={styles.category_category}>{info.category}</span>
              <span className={styles.category_selection}>{info.selectionNum}</span>
              <span className={styles.category_compare_selection}>{info.compareSelectionNum}</span>
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        hasNext={currentPage < totalPages}
      />
    </div>
  );
}

export default Compare;
