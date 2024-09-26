import React, { useEffect, useState } from "react";
import styles from "./Details.module.css";

function Details() {
  const [company, setCompany] = useState();
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
      description:
        "코드잇은 '온라인 코딩 교육 서비스'를 운영하는 EdTech 스타트업입니다. 코딩 교육과 데이터 사이언스 교육에 대한 수요는 급격히 늘어나고 있지만, 아직까지 좋은 교육 서비스를 찾기란 쉽지 않습니다. 이를 해결하고자 코드잇은 모든 강의를 자체 제작하여 퀄리티 높은 콘텐츠를 제공하고, 동시에 코딩 교육에 최적화된 플랫폼을 개발하고 있습니다. 모든 강의를 마음껏 들을 수 있는 코드잇 무제한 멤버십을 제공하고 있으며, 지난 5년 동안 21만 명의 수강생과 평균 만족도 4.9점이라는 국내 교육 업계에서 보기 드문 성과를 달성하였습니다. 또한 콘텐츠와 기술력을 인정받아 2021년 10월 Series B 투자를 받아 누적 140억 원의 투자를 받았고, 현재 40여 명의 팀원이 같은 목표를 향해 나아가고 있습니다. “배움의 기쁨을 세상 모두에게.” 이것이 코드잇의 비전입니다. 현재는 최고의 코딩 교육 서비스를 국내에서 제공하고 있지만, 이보다 더 큰 그림을 그리고 있습니다. 2021년 상반기부터 영어권 시장 진출을 시작했고, 코딩과 인접한 분야부터 스펙트럼을 넓혀 나갈 계획입니다.",
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
      setCompany(mockData);
    }, 1000);
  }, []);

  if (!company) {
    return <div>데이터 불러오지 못했습니다</div>;
  }

  return (
    <div className={styles.corporate}>
      {/* TODO: 1. api를 받아와야함 2. 페이지네이션 */}
      <div className={styles.corporate_information}>
        <div className={styles.corporate_name}>
          <h3>{company.name}</h3>
          <h4 className={styles.cor_type}>{company.category}</h4> <hr />
        </div>
        <div className={styles.corporate_status}>
          <div className={styles.overview_wrapper}>
            <div className={styles.overview}>
              <h5>누적 투자 금액</h5>
              <p>{company.totalInvestment}억 원</p>
            </div>
            <div className={styles.overview}>
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
            {company.investments.map((investment, index) => (
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
