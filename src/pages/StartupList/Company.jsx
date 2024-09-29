import React from "react";
import styles from "./Company.module.css";
import codeitIcon from "../../assets/icon_codeit.jpg";

const Company = ({ company }) => {
  const companyName = company.name;
  const companyDescription = company.description;
  const companyCategory = company.category;
  const companyTotalInvestment = company.TotalInvestment;
  const companyRevenue = company.revenue;
  const companyEmployees = company.employees;

  return (
    <div className={styles.companies}>
      <div className={styles.company_text}>
        <img className={styles.company_img} src={codeitIcon} alt={company.name} />
        <p className={styles.category_company_name}>{companyName}</p>
        <p className={styles.category_company_info}>{companyDescription}</p>
        <p className={styles.category_category}>{companyCategory}</p>
        <p className={styles.category_investment_amount}>{companyTotalInvestment}</p>
        <p className={styles.category_sales}>{companyRevenue}</p>
        <p className={styles.category_employee_num}>{companyEmployees}</p>
      </div>
    </div>
  );
};

export default Company;
