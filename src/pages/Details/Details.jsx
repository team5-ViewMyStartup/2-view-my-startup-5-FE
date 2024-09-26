import React, { useEffect, useState } from "react";
import styles from "./Details.module.css";

function Details() {
  const [startup, setStartup] = useState();
  // TODO: fetch 작업
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/startup/미정")
  //     .then((response) => response.json())
  //     .then((data) => setStartup(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  // FIXME: 임시 데이터
  useEffect(() => {
    const mockData = {
      name: "코드잇",
      category: "에듀테크",
      totalInvestment: 140,
      revenue: 44.3,
      employees: 95,
      description: "코드잇은 '온라인 코딩 교육 서비스'를 운영하는 EdTech 스타트업입니다.",
      investments: [
        {
          investorName: "김연우",
          rank: 1,
          amount: 10,
          comment: "코드잇은 정말 훌륭한 기업입니다!",
        },
        {
          investorName: "이유지",
          rank: 2,
          amount: 9,
          comment: "코드잇은 정말 훌륭한 기업입니다!",
        },
        {
          investorName: "안다해",
          rank: 3,
          amount: 8,
          comment: "코드잇은 정말 훌륭한 기업입니다!",
        },
        {
          investorName: "이유지",
          rank: 4,
          amount: 7,
          comment: "코드잇은 정말 훌륭한 기업입니다!",
        },
        {
          investorName: "이유지",
          rank: 5,
          amount: 6,
          comment: "코드잇은 정말 훌륭한 기업입니다!",
        },
      ],
    };
    setTimeout(() => {
      setStartup(mockData);
    }, 1000);
  }, []);

  if (!startup) {
    return <div>데이터 불러오지 못했습니다</div>;
  }

  return (
    <div className={styles.corporate}>
      {/* TODO: 1. api를 받아와야함 2. 페이지네이션 */}
      <div className={styles.corporate_information}>
        <div className={styles.corporate_name}>
          <h3>{startup.name}</h3>
          <h4 className={styles.cor_type}>{startup.category}</h4> <hr />
        </div>
        <div className={styles.corporate_status}>
          <div className={styles.overview_wrapper}>
            <div className={styles.overview}>
              <h5>누적 투자 금액</h5>
              <p>{startup.totalInvestment}억 원</p>
            </div>
            <div className={styles.overview}>
              <h5>매출액</h5>
              <p>{startup.revenue} 억 원</p>
            </div>
            <div className={styles.overview}>
              <h5>고용 인원</h5>
              <p>{startup.employees} 명</p>
            </div>
          </div>
          <div className={styles.introduction}>
            <h5>기업 소개</h5>
            <p>코드잇은 '온라인 코딩 교육 서비스'를 운영하는 EdTech 스타트업입니다.</p>
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
          <h3>총 00억원</h3>
        </div>
        <table>
          <thead className={styles.detail_table_head}>
            <tr>
              <th className={styles.table_inform}>투자자 이름</th>
              <th className={styles.table_inform}>순위</th>
              <th className={styles.table_inform}>투자 금액</th>
              <th>투자 코멘트</th>
            </tr>
          </thead>
          <tbody>
            {startup.investments.map((investment, index) => (
              <tr key={index}>
                <td>{investment.investorName}</td>
                <td>{investment.rank} 위</td>
                <td>{investment.amount} 억 원</td>
                <td>{investment.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Details;
