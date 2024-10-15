import React, { useEffect, useState } from "react";
import styles from "../../components/Style/style.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import ListHeader from "../../components/List/ListHeader";
import { investmentOptions } from "../../components/Dropdown/DropdownOption";
import { investmentHeader } from "../../components/List/HeaderOption";
import Pagination from "../../components/Pagination/Pagination";
import { fetchCompanyData } from "../../api/api";

function Investment() {
  const viewCompanyInfoNum = 10;
  const [orderBy, setOrderBy] = useState("View My Startup 투자 금액 높은순");
  const [investment, setInvestment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await fetchCompanyData();
        setInvestment(data.sort((a, b) => b.totalInvestment - a.totalInvestment)); // 총 투자금액 기준으로 정렬
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanies();
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
        sorted = sorted.sort((a, b) => b.revenue - a.revenue);
        break;
      case "startup-investment-low":
        sorted = sorted.sort((a, b) => a.revenue - b.revenue);
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
      <div className={styles.mobile_scroll}>
        <ListHeader headers={investmentHeader} type="status" />
        <div className={styles.investment_body}>
          <ul className={styles.category_classification}>
            {sortedData.slice(indexOfFirstItem, indexOfLastItem).map((info, index) => (
              <li key={index + indexOfFirstItem} className={styles.category_body}>
                <span className={styles.category_rank}>{index + indexOfFirstItem + 1}위</span>
                <span className={styles.category_company_name}>
                  <img src={info.image} className={styles.logo_img} />
                  {info.name}
                </span>
                <span className={styles.category_company_info}>{info.description}</span>
                <span className={styles.category_category}>{info.category}</span>
                <span className={styles.category_startup_investment}>{info.startupTotal}억 원</span>
                <span className={styles.category_total_investment}>
                  {info.totalInvestment}억 원
                </span>
              </li>
            ))}
          </ul>
        </div>
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
