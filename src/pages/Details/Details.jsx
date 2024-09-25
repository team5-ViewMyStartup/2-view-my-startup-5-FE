import React, { useState } from "react";
import styles from "./Details.module.css";

function Details() {
  return (
    <div className={styles.corporate}>
      {/* TODO: 1. api를 받아와야함 2. 페이지네이션 */}
      <div className={styles.corporate_information}>
        <div className={styles.corporate_name}>
          <h3>코드잇</h3>
          <h4 className={styles.cor_type}>에듀테크</h4> <hr />
        </div>
        <div className={styles.corporate_status}>
          <div className={styles.overview_wrapper}>
            <div className={styles.overview}>
              <h5>누적 투자 금액</h5>
              <p>억 원</p>
            </div>
            <div className={styles.overview}>
              <h5>매출액</h5>
              <p>억 원</p>
            </div>
            <div className={styles.overview}>
              <h5>고용 인원</h5>
              <p> 명</p>
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
            <tr>
              <td>dafs</td>
              <td>dfaf</td>
              <td>dafs</td>
              <td>dfaf</td>
            </tr>
            <tr>
              <td>dafs</td>
              <td>dfaf</td>
              <td>dafs</td>
              <td>dfaf</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Details;
