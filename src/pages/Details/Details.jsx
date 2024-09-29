import React, { useEffect, useState } from "react";
import select from "../../images/select_img.svg";
import styles from "./Details.module.css";
const ITEM_PER_PAGE = 5;

function Details() {
  const [company, setCompany] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const totalInvestmentAmount = company
    ? company.investments.reduce((total, investment) => {
        return total + investment.amount;
      }, 0)
    : 0;

  const indexOfLastItem = currentPage * ITEM_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEM_PER_PAGE;
  const sortedAmount = company ? [...company.investments].sort((a, b) => b.amount - a.amount) : [];
  const currentInvestments = company ? sortedAmount.slice(indexOfFirstItem, indexOfLastItem) : [];

  useEffect(() => {
    fetch("/detailsData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터 불러오지 못함");
        }
        return response.json();
      })
      .then((data) => setCompany(data[0]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!company) {
    return <div>데이터 불러오지 못했습니다</div>;
  }

  const totalPages = Math.ceil(company.investments.length / ITEM_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.corporate}>
      <div className={styles.corporate_information}>
        <div className={styles.corporate_name}>
          <h3>{company.name}</h3>
          <h4 className={styles.cor_type}>{company.category}</h4> <hr />
        </div>
        <div className={styles.corporate_status}>
          <div className={styles.overview_wrapper}>
            <div className={styles.overview}>
              <h5>누적 투자 금액</h5>
              <p>{totalInvestmentAmount}억 원</p>
            </div>
            <div className={`${styles.overview} ${styles.account}`}>
              <h5>매출액</h5>
              <p>{company.revenue} 억 원</p>
            </div>
            <div className={styles.overview}>
              <h5>고용 인원</h5>
              <p>{company.employees} 명</p>
            </div>
          </div>
          <div className={styles.introduction}>
            <h5>기업 소개</h5>
            <p>{company.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.investment_received}>
        <div className={styles.invest_wrapper}>
          <h3>View My Startup에서 받은 투자</h3>
          <button className={styles.invest_button}>기업투자하기</button>
        </div>
        <hr />
        <div>
          <h3>총 {totalInvestmentAmount} 억원</h3>
        </div>
        <div className={styles.investment_container}>
          <ul className={styles.investment_list}>
            <li className={styles.investment_header}>
              <span className={styles.invest_inform}>순위</span>
              <span className={styles.invest_inform}>투자자 이름</span>
              <span className={styles.invest_inform}>투자 금액</span>
              <span className={styles.investment_comment}>투자 코멘트</span>
            </li>
            {currentInvestments.map((investment, index) => (
              <li key={index + indexOfFirstItem} className={styles.investment_item}>
                <span className={styles.invest_inform}>{investment.investorName}</span>
                <span className={styles.invest_inform}>{index + indexOfFirstItem + 1} 위</span>
                <span className={styles.invest_inform}>{investment.amount} 억 원</span>
                <span className={styles.comment_content}>{investment.comment}</span>
                <img src={select} alt="select icon" className={styles.select_img} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.page_button}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`${styles.page_button} ${currentPage === index + 1 ? styles.active : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={styles.page_button}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
export default Details;
