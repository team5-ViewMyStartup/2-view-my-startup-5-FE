import React, { useEffect, useState } from "react";
import styles from "./Investment.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import ListHeader from "../../components/List/ListHeader";
import { investmentOptions } from "../../components/Dropdown/DropdownOption";
import { companyHeader } from "../../components/List/HeaderOption";
import Pagination from "../../components/Pagination/Pagination";

function Investment() {
  const viewCompanyInfoNum = 10;
  const [orderBy, setOrderBy] = useState("View My Startup 투자 금액 높은순");
  const [investment, setInvestment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);

  useEffect(async () => {
    const response = await fetch("/allCompanyData.json");
    if (!response.ok) throw new Error("데이터를 불러오지 못 함");
    const data = await response.json();
    setInvestment(data.sort((a, b) => b.startupInvestment - a.startupInvestment));
  }, []);

  const totalPages = Math.ceil(investment.length / viewCompanyInfoNum);
  const indexOfLastItem = currentPage * viewCompanyInfoNum;
  const indexOfFirstItem = indexOfLastItem - viewCompanyInfoNum;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    let sorted = [...investment];
    switch (orderBy) {
      case "startup-investment-high":
        sorted = sorted.sort((a, b) => b.startupInvestment - a.startupInvestment);
        break;
      case "startup-investment-low":
        sorted = sorted.sort((a, b) => a.startupInvestment - b.startupInvestment);
        break;
      case "actual-investment-high":
        sorted = sorted.sort((a, b) => b.totalInvestment - a.totalInvestment);
        break;
      case "actual-investment-low":
        sorted = sorted.sort((a, b) => a.totalInvestment - b.totalInvestment);
    }
    setSortedData(sorted);
  }, [investment, orderBy]);

  const orderMap = investmentOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {});

  return (
    <div className={styles.investment}>
      <div className={styles.investment_header}>
        <p className={styles.investment_status}>투자 현황</p>
        <div className={styles.dropdown}>
          <Dropdown
            options={investmentOptions}
            selectedOption={orderMap[orderBy] || "View My Startup 투자 금액 높은순"}
            onSelect={setOrderBy}
            isCompanyOptions={false}
          />
        </div>
      </div>
      <ListHeader headers={companyHeader} type="company" />
      <div className={styles.investment_body}>
        <ul className={styles.category_classification}>
          {sortedData.slice(indexOfFirstItem, indexOfLastItem).map((info, index) => (
            <li key={index + indexOfFirstItem} className={styles.category_body}>
              <span className={styles.category_rank}>{index + indexOfFirstItem + 1} 위</span>
              <span className={styles.category_company_name}>{info.name}</span>
              <span className={styles.category_company_info}>{info.description}</span>
              <span className={styles.category_category}>{info.category}</span>
              <span className={styles.category_startup_investment}>{info.startupInvestment}</span>
              <span className={styles.category_total_investment}>{info.totalInvestment}</span>
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

export default Investment;
