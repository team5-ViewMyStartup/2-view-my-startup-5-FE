import React, { useEffect, useState } from "react";
import styles from "./StartupList.module.css";
import searchIcon from "../../assets/ic_search.svg";
import Pagination from "../../components/Pagination/Pagination";
import Dropdown from "../../components/Dropdown/Dropdown";
import ListHeader from "../../components/List/ListHeader";
import { companyHeader } from "../../components/List/HeaderOption";
import { companyOptions } from "../../components/Dropdown/DropdownOption";
import { fetchCompanyData } from "../../api/api";

function StartupList() {
  const viewCompanyInfoNum = 10;
  const [orderBy, setOrderBy] = useState("누적 투자금액 높은순");
  const [company, setCompany] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await fetchCompanyData();
        setCompany(data.sort((a, b) => b.totalInvestment - a.totalInvestment)); // 총 투자금액 기준으로 정렬
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanies();
  }, []);

  const totalPages = Math.ceil(company.length / viewCompanyInfoNum);
  const indexOfLastItem = currentPage * viewCompanyInfoNum;
  const indexOfFirstItem = indexOfLastItem - viewCompanyInfoNum;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    let sorted = [...company];
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
  }, [company, orderBy]);

  const orderMap = companyOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {});

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
            <Dropdown
              options={companyOptions}
              selectedOption={orderMap[orderBy] || "누적 투자금액 높은순"}
              onSelect={setOrderBy}
              isCompanyOptions={true}
            />
          </div>
        </div>
      </div>

      <ListHeader headers={companyHeader} type="company" />
      <div className={styles.category_box}>
        <ul className={styles.category_kind}>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        hasNext={currentPage < totalPages}
      />
    </div>
  );
}

export default StartupList;
