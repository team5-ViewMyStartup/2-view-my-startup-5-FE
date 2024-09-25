import React, { useState } from "react";
import styles from "./Details.module.css";

function Details() {
  return (
    <div className={styles.corporate}>
      {/* TODO: 1. api를 받아와야함 2. 페이지네이션 */}
      <div className={styles.corporate_information}>
        <div className={styles.corporate_name}>
          <h2>codeit</h2>
          <span>에듀테크</span>
        </div>
        <div className={styles.corporate_status}>
          <div className={styles.overview}></div>
          <div className={styles.introduction}></div>
        </div>
      </div>
      <div className={styles.investment_received}>
        <div>
          <h2>View My Startup에서 받은 투자</h2>
          <button>기업투자하기</button>
        </div>
        <div>총 00억원</div>
        <table>
          <thead>
            <tr>
              <th>투자자 이름</th>
              <th>순위</th>
              <th>투자 금액</th>
              <th>투자 코멘트</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
export default Details;
