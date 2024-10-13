import React, { useEffect, useState } from "react";
import styles from "./CompareResult.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import { companyOptions, rankingOptions } from "../../components/Dropdown/DropdownOption";
import ListHeader from "../../components/List/ListHeader";
import { companyHeader, compareResultHeader } from "../../components/List/HeaderOption";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { fetchCompareData, fetchDetailCompanyData, fetchInvestmentsData } from "../../api/api";
import InvestModal from "../../components/Modal/InvestModal";

function CompareResult() {
  const viewCompanyInfoNum = 5;
  const [compareOrderBy, setCompareOrderBy] = useState("누적 투자금액 높은순");
  const [companyOrderBy, setCompanyOrderBy] = useState("매출액 높은순");
  // const [compareCompany, setCompareCompany] = useState([]);
  // const [myCompany, setMyCompany] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [sortedMyCompanyData, setSortedMyCompanyData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMyCompany, setSelectedMyCompany] = useState(null);
  const [selectedCompareCompany, setSelectedCompareCompany] = useState([]);

  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [investments, setInvestments] = useState([]);
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  const openInvestModal = () => {
    setInvestModalOpen(true);
  };

  const closeInvestModal = () => {
    setInvestModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyData = await fetchDetailCompanyData(companyId);
        setCompany(companyData);

        const investmentData = await fetchInvestmentsData(companyId);
        setInvestments(investmentData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [companyId, investments]);

  const handleAddInvestment = (newInvestment) => {
    setInvestments((prevInvestments) => [...prevInvestments, newInvestment]);
  };

  // useEffect(async () => {
  //   const response = await fetch("/allCompanyData.json");
  //   if (!response.ok) throw new Error("데이터를 불러오지 못 함");
  //   const data = await response.json();
  //   setCompare(data.sort((a, b) => b.totalInvestment - a.totalInvestment));
  //   setCompany(data.sort((a, b) => b.revenue - a.revenue));
  // }, []);

  // console.log("baseCompanyId :::::", searchParams.get("baseCompanyId"));
  // console.log("compareCompanyId :::::", searchParams.getAll("compareCompanyId"));

  // console.log(searchParams.toString());
  useEffect(async () => {
    const baseCompanyId = searchParams.get("baseCompanyId");
    const compareCompanyId = searchParams.getAll("compareCompanyId");

    const baseData = await fetchCompareData(baseCompanyId, compareCompanyId);
    console.log("baseData ::::::::", baseData);
    const myCompanyData = await fetchDetailCompanyData(baseCompanyId);
    console.log("my company data :::::::::", myCompanyData);
    const compareCompanyData = baseData.filter((element) => element.id !== myCompanyData.id);
    console.log(1, compareCompanyData);
    setSelectedMyCompany(myCompanyData);
    setSelectedCompareCompany(
      compareCompanyData.sort((a, b) => b.totalInvestment - a.totalInvestment),
    );
    // setCompareCompany(baseData.sort((a, b) => b.totalInvestment - a.totalInvestment));
    // setMyCompany(baseData.sort((a, b) => b.revenue - a.revenue));
  }, [searchParams]);

  console.log("selectedMyCompany ::::", selectedMyCompany);
  console.log("selectedCompareCompany ::::", selectedCompareCompany);

  const indexOfLastItem = currentPage * viewCompanyInfoNum;
  const indexOfFirstItem = indexOfLastItem - viewCompanyInfoNum;

  useEffect(() => {
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
  }, [selectedCompareCompany, compareOrderBy]);

  // useEffect(() => {
  //   let companySorted = [...selectedMyCompany];
  //   switch (companyOrderBy) {
  //     case "sales-high":
  //       companySorted = companySorted.sort((a, b) => b.revenue - a.revenue);
  //       break;
  //     case "sales-low":
  //       companySorted = companySorted.sort((a, b) => a.revenue - b.revenue);
  //       break;
  //     case "employeeNum-high":
  //       companySorted = companySorted.sort((a, b) => b.employees - a.employees);
  //       break;
  //     case "employeeNum-low":
  //       companySorted = companySorted.sort((a, b) => a.employees - b.employees);
  //   }
  //   setSortedMyCompanyData(companySorted);
  // }, [selectedMyCompany, companyOrderBy]);

  const compareOrderMap = companyOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {});

  const companyOrderMap = rankingOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  });

  if (!selectedMyCompany) {
    return <p>유효한 회사 정보가 없습니다.</p>;
  }

  return (
    <div className={styles.selected_company_result}>
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
        <ListHeader headers={compareResultHeader} type="result" />
        <div className={styles.category_box_compare}>
          <ul className={styles.category_kind_compare}>
            <li className={styles.category_my_company_body}>
              <span className={styles.my_company_name}>
                <img src={selectedMyCompany.image} className={styles.logo_img} />
                {selectedMyCompany.name}
              </span>
              <span className={styles.my_company_info}>{selectedMyCompany.description}</span>
              <span className={styles.my_company_category}>{selectedMyCompany.category}</span>
              <span className={styles.my_company_investment_amount}>
                {selectedMyCompany.totalInvestment}억 원
              </span>
              <span className={styles.my_company_sales}>{selectedMyCompany.revenue}억 원</span>
              <span className={styles.my_company_employee_num}>
                {selectedMyCompany.employees}명
              </span>
            </li>
            {sortedData.slice(indexOfFirstItem, indexOfLastItem - 1).map((info, index) => (
              <li key={index + indexOfFirstItem} className={styles.category_body}>
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
                <span className={styles.compare_company_employee_num}>{info.employees}명</span>
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
            {sortedMyCompanyData.slice(indexOfFirstItem, indexOfLastItem).map((info, index) => (
              <li key={index + indexOfFirstItem} className={styles.category_body}>
                <span className={styles.category_rank}>{index + indexOfFirstItem + 1}위</span>
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
      <div className={styles.my_company_investment}>
        <button className={styles.investment_button} onClick={openInvestModal}>
          나의 기업에 투자하기
        </button>
      </div>
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
