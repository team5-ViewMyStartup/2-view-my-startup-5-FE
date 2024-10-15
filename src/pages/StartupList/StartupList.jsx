import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./StartupList.module.css";
import Pagination from "../../components/Pagination/Pagination";
import Dropdown from "../../components/Dropdown/Dropdown";
import ListHeader from "../../components/List/ListHeader";
import { companyHeader } from "../../components/List/HeaderOption";
import { companyOptions } from "../../components/Dropdown/DropdownOption";
import { fetchCompanyData } from "../../api/api";
import Loading from "../../components/Loading";

const S3_BASE_URL = process.env.REACT_APP_S3_BASE_URL;

function StartupList() {
  const VIEW_COMPANY_INFO_NUM = 10;
  const [orderBy, setOrderBy] = useState("누적 투자금액 높은순");
  const [company, setCompany] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const data = await fetchCompanyData();
        setCompany(data.sort((a, b) => b.totalInvestment - a.totalInvestment));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = () => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = company.filter((info) => {
        return (
          info.name.toLowerCase().includes(lowerCaseQuery) ||
          info.category.toLowerCase().includes(lowerCaseQuery)
        );
      });

      let sorted = filtered;
      switch (orderBy) {
        case "investment-high":
          sorted = filtered.sort((a, b) => b.totalInvestment - a.totalInvestment);
          break;
        case "investment-low":
          sorted = filtered.sort((a, b) => a.totalInvestment - b.totalInvestment);
          break;
        case "sales-high":
          sorted = filtered.sort((a, b) => b.revenue - a.revenue);
          break;
        case "sales-low":
          sorted = filtered.sort((a, b) => a.revenue - b.revenue);
          break;
        case "employeeNum-high":
          sorted = filtered.sort((a, b) => b.employees - a.employees);
          break;
        case "employeeNum-low":
          sorted = filtered.sort((a, b) => a.employees - b.employees);
          break;
        default:
          sorted = filtered;
          break;
      }

      setFilteredData(sorted);
      setCurrentPage(1);
    };
    fetchData();
  }, [company, searchQuery, orderBy]);

  const totalPages = Math.ceil(filteredData.length / VIEW_COMPANY_INFO_NUM);
  const indexOfLastItem = currentPage * VIEW_COMPANY_INFO_NUM;
  const indexOfFirstItem = indexOfLastItem - VIEW_COMPANY_INFO_NUM;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
    }
  };

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
            <img
              className={styles.search_img}
              src={`${S3_BASE_URL}/search_icon.svg`}
              alt="search icon"
            />
            <input
              className={styles.search_input}
              placeholder="검색어를 입력해주세요"
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.category_box}>
            <ul className={styles.category_kind}>
              {filteredData.length === 0 ? (
                <li className={styles.no_results}>검색 결과가 없습니다.</li>
              ) : (
                filteredData.slice(indexOfFirstItem, indexOfLastItem).map((info, index) => (
                  <li key={index + indexOfFirstItem} className={styles.category_body}>
                    <span className={styles.category_rank}>{index + indexOfFirstItem + 1}위</span>
                    <Link to={`/details/${info.id}`}>
                      <span className={styles.category_company_name}>
                        <img src={info.image} className={styles.logo_img} />
                        {info.name}
                      </span>
                    </Link>
                    <span className={styles.category_company_info}>{info.description}</span>
                    <span className={styles.category_category}>{info.category}</span>
                    <span className={styles.category_investment_amount}>
                      {info.totalInvestment}억 원
                    </span>
                    <span className={styles.category_sales}>{info.revenue}억 원</span>
                    <span className={styles.category_employee_num}>{info.employees}명</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      )}
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
