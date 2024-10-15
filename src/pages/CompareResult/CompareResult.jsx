import React, { useEffect, useState } from "react";
import styles from "./CompareResult.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import { companyOptions, rankingOptions } from "../../components/Dropdown/DropdownOption";
import ListHeader from "../../components/List/ListHeader";
import { companyHeader, compareResultHeader } from "../../components/List/HeaderOption";
import { Link, useSearchParams, useParams } from "react-router-dom";
import {
  fetchCompareData,
  fetchDetailCompanyData,
  fetchInvestmentsData,
  fetchMyCompanyData,
} from "../../api/api";
import InvestModal from "../../components/Modal/InvestModal";
import Loading from "../../components/Loading";

function CompareResult() {
  const VIEW_COMPANY_INFO_NUM = 5;
  const [compareOrderBy, setCompareOrderBy] = useState("누적 투자금액 높은순");
  const [companyOrderBy, setCompanyOrderBy] = useState("매출액 높은순");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [sortedTopCompanyData, setSortedTopCompanyData] = useState([]);
  const [sortedBottomCompanyData, setSortedBottomCompanyData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMyCompany, setSelectedMyCompany] = useState(null);
  const [selectedCompareCompany, setSelectedCompareCompany] = useState([]);
  const [topCompany, setTopCompany] = useState([]);
  const [bottomCompany, setBottomCompany] = useState([]);
  const [myCompanyRank, setMyCompanyRank] = useState(1);

  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [investments, setInvestments] = useState([]);
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const openInvestModal = () => {
    setInvestModalOpen(true);
  };

  const closeInvestModal = () => {
    setInvestModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const companyData = await fetchDetailCompanyData(companyId);
        setCompany(companyData);

        const investmentData = await fetchInvestmentsData(companyId);
        setInvestments(investmentData);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [companyId]);

  const handleAddInvestment = (newInvestment) => {
    setInvestments((prevInvestments) => [...prevInvestments, newInvestment]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const baseCompanyId = searchParams.get("baseCompanyId");
      const compareCompanyId = searchParams.getAll("compareCompanyId");

      const baseData = await fetchCompareData(baseCompanyId, compareCompanyId);
      const myCompanyData = await fetchDetailCompanyData(baseCompanyId);
      const compareCompanyData = baseData.filter((element) => element.id !== myCompanyData.id);

      setSelectedMyCompany(myCompanyData);
      setSelectedCompareCompany(
        compareCompanyData.sort((a, b) => b.totalInvestment - a.totalInvestment),
      );
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const id = searchParams.get("baseCompanyId");

      const baseData = await fetchMyCompanyData(id);

      if (companyOrderBy === "매출액 높은순" || companyOrderBy === "sales-high") {
        setTopCompany(baseData.revenue.gte.sort((a, b) => b.revenue - a.revenue));
        setBottomCompany(baseData.revenue.lt.sort((a, b) => b.revenue - a.revenue));
        setMyCompanyRank(baseData.companyRevenueRank);
      } else if (companyOrderBy === "sales-low") {
        setTopCompany(baseData.revenue.lt.sort((a, b) => a.revenue - b.revenue));
        setBottomCompany(baseData.revenue.gte.sort((a, b) => a.revenue - b.revenue));
        setMyCompanyRank(baseData.companyRevenueRank);
      } else if (companyOrderBy === "employeeNum-high") {
        setTopCompany(baseData.employee.gte.sort((a, b) => b.employees - a.employees));
        setBottomCompany(baseData.employee.lt.sort((a, b) => b.employees - a.employees));
        setMyCompanyRank(baseData.companyEmployeesRank);
      } else if (companyOrderBy === "employeeNum-low") {
        setTopCompany(baseData.employee.lt.sort((a, b) => a.revenue - b.revenue));
        setBottomCompany(baseData.employee.gte.sort((a, b) => a.revenue - b.revenue));
        setMyCompanyRank(baseData.companyEmployeesRank);
      }
    };
    fetchData();
  }, [searchParams, companyOrderBy]);

  const indexOfLastItem = currentPage * VIEW_COMPANY_INFO_NUM;
  const indexOfFirstItem = indexOfLastItem - VIEW_COMPANY_INFO_NUM;

  useEffect(() => {
    const fetchData = () => {
      let compareSorted = [...selectedCompareCompany];
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
    };
    fetchData();
  }, [selectedCompareCompany, compareOrderBy]);

  useEffect(() => {
    const fetchData = () => {
      let topCompanySorted = [...topCompany];
      let bottomCompanySorted = [...bottomCompany];
      switch (companyOrderBy) {
        case "sales-high":
          topCompanySorted = topCompanySorted.sort((a, b) => b.revenue - a.revenue);
          bottomCompanySorted = bottomCompanySorted.sort((a, b) => b.revenue - a.revenue);
          break;
        case "sales-low":
          topCompanySorted = topCompanySorted.sort((a, b) => a.revenue - b.revenue);
          bottomCompanySorted = bottomCompanySorted.sort((a, b) => a.revenue - b.revenue);
          break;
        case "employeeNum-high":
          topCompanySorted = topCompanySorted.sort((a, b) => b.employees - a.employees);
          bottomCompanySorted = bottomCompanySorted.sort((a, b) => b.employees - a.employees);
          break;
        case "employeeNum-low":
          topCompanySorted = topCompanySorted.sort((a, b) => a.employees - b.employees);
          bottomCompanySorted = bottomCompanySorted.sort((a, b) => a.employees - b.employees);
      }
      setSortedTopCompanyData(topCompanySorted);
      setSortedBottomCompanyData(bottomCompanySorted);
    };
    fetchData();
  }, [topCompany, bottomCompany, companyOrderBy]);

  const compareOrderMap = companyOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {});

  const companyOrderMap = rankingOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  });

  if (!selectedMyCompany) {
    return <p></p>;
  }

  return (
    <div className={styles.selected_company_result}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.selected_company_result_header}>
            <p className={styles.selected_company_text}>내가 선택한 기업</p>
            <div className={styles.selected_compare_button}>
              <Link to="/compare">
                <button className={styles.compare_button}>다른 기업 비교하기</button>
              </Link>
            </div>
          </div>
          <div className={styles.selected_company_box}>
            <img src={selectedMyCompany.image} className={styles.my_company_logo_img} />
            <p className={styles.company_name}>{selectedMyCompany.name}</p>
            <p className={styles.company_category}>{selectedMyCompany.category}</p>
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
            <div className={styles.compare_section}>
              <ListHeader headers={compareResultHeader} type="result" />
              <div className={styles.category_box_compare}>
                <ul className={styles.category_kind_compare}>
                  <li className={styles.category_my_company_body}>
                    <span className={styles.my_company_name}>
                      <img src={selectedMyCompany.image} className={styles.logo_img} />
                      {selectedMyCompany.name}
                    </span>
                    <span className={styles.my_company_info}>{selectedMyCompany.description}</span>
                    <span className={styles.compare_company_category}>
                      {selectedMyCompany.category}
                    </span>
                    <span className={styles.compare_company_investment_amount}>
                      {selectedMyCompany.totalInvestment}억 원
                    </span>
                    <span className={styles.compare_company_sales}>
                      {selectedMyCompany.revenue}억 원
                    </span>
                    <span className={styles.compare_company_employee_num}>
                      {selectedMyCompany.employees}명
                    </span>
                  </li>
                  {sortedData.slice(indexOfFirstItem, indexOfLastItem - 1).map((info, index) => (
                    <li key={index + indexOfFirstItem} className={styles.category_compare_body}>
                      <span className={styles.compare_company_name}>
                        <img className={styles.logo_img} src={info.image} />
                        {info.name}
                      </span>
                      <span className={styles.compare_company_info}>{info.description}</span>
                      <span className={styles.compare_company_category}>{info.category}</span>
                      <span className={styles.compare_company_investment_amount}>
                        {info.totalInvestment}억 원
                      </span>
                      <span className={styles.compare_company_sales}>{info.revenue}억 원</span>
                      <span className={styles.compare_company_employee_num}>
                        {info.employees}명
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
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
            <div className={styles.compare_section}>
              <ListHeader headers={companyHeader} type="company" />
              <div className={styles.category_box_rank}>
                <ul className={styles.category_kind_rank}>
                  {sortedTopCompanyData
                    .slice(indexOfFirstItem, indexOfLastItem)
                    .map((info, index) => (
                      <li key={index + indexOfFirstItem} className={styles.category_body}>
                        <span className={styles.category_rank}>
                          {myCompanyRank - topCompany.length + index}위
                        </span>
                        <span className={styles.category_company_name}>
                          <img src={info.image} className={styles.logo_img} />
                          {info.name}
                        </span>
                        <span className={styles.category_company_info}>{info.description}</span>
                        <span className={styles.category_category}>{info.category}</span>
                        <span className={styles.category_investment_amount}>
                          {info.totalInvestment}억 원
                        </span>
                        <span className={styles.category_sales}>{info.revenue}억 원</span>
                        <span className={styles.category_employee_num}>{info.employees}명</span>
                      </li>
                    ))}
                  <li className={styles.category_my_company_body}>
                    <span className={styles.company_rank}>{myCompanyRank}위</span>
                    <span className={styles.compare_my_company_name}>
                      <img src={selectedMyCompany.image} className={styles.logo_img} />
                      {selectedMyCompany.name}
                    </span>
                    <span className={styles.company_info}>{selectedMyCompany.description}</span>
                    <span className={styles.my_company_category}>{selectedMyCompany.category}</span>
                    <span className={styles.company_investment_amount}>
                      {selectedMyCompany.totalInvestment}억 원
                    </span>
                    <span className={styles.company_sales}>{selectedMyCompany.revenue}억 원</span>
                    <span className={styles.company_employee_num}>
                      {selectedMyCompany.employees}명
                    </span>
                  </li>
                  {sortedBottomCompanyData
                    .slice(indexOfFirstItem, indexOfLastItem)
                    .map((info, index) => (
                      <li key={index + indexOfFirstItem} className={styles.category_bottom_body}>
                        <span className={styles.category_rank}>{myCompanyRank + index + 1}위</span>
                        <span className={styles.category_company_name}>
                          <img src={info.image} className={styles.logo_img} />
                          {info.name}
                        </span>
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
          </div>
          <div className={styles.my_company_investment}>
            <button className={styles.investment_button} onClick={openInvestModal}>
              나의 기업에 투자하기
            </button>
          </div>{" "}
        </>
      )}

      {investModalOpen && (
        <InvestModal
          isOpen={investModalOpen}
          onClose={closeInvestModal}
          company={selectedMyCompany}
          onAdd={handleAddInvestment}
        />
      )}
    </div>
  );
}

export default CompareResult;
