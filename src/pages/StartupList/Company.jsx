import React from "react";
import useCompany from "../../hooks/usePageHandler";
import styles from "./Company.module.css";
import codeitIcon from "../../assets/icon_codeit.jpg";

const Company = ({ company, rank }) => {
  const companyName = company.name;
  const companyDescription = company.description;
  const companyCategory = company.category;
  const companyTotalInvestment = company.TotalInvestment;
  const companyRevenue = company.revenue;
  const companyEmployees = company.employees;

  if (!company) {
    return <div>데이터를 불러오지 못했습니다</div>;
  }

  return (
    <div className={styles.company}>
      <span className={styles.category_rank}>{rank} 위</span>
      <h3>{companyName}</h3>
      <p>{companyDescription}</p>
      <p>{companyCategory}</p>
      <p>{companyTotalInvestment}</p>
      <p>{companyRevenue}</p>
      <p>{companyEmployees}</p>
    </div>
  );
};

export default Company;
