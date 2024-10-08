const BASE_URL = process.env.REACT_APP_BASE_URL;

const HTTP_METHODS = Object.freeze({
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
});

export async function fetchData({ url, method = HTTP_METHODS.GET, data, headers = {} }) {
  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("에러 발생");
  }
  return {
    body: await response.json(),
    headers: response.headers,
  };
}

export const fetchCompanyData = async () => {
  const res = await fetchData({
    url: `${BASE_URL}/companies`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.body;
};

export const fetchDetailCompanyData = async (companyId) => {
  const res = await fetchData({
    url: `${BASE_URL}/companies/${companyId}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.body;
};

// 상세 페이지
export const fetchInvestmentsData = async (companyId) => {
  const res = await fetchData({
    url: `${BASE_URL}/investments/${companyId}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.body;
};

export const updateInvestmentComment = async (investmentId, investorName, comment, password) => {
  const res = await fetchData({
    url: `${BASE_URL}/investments/${investmentId}`,
    method: HTTP_METHODS.PATCH,
    headers: {
      "Content-Type": "application/json",
    },
    data: { comment, password },
  });
  return res.body;
};

export const deleteInvestment = async (investmentId, investorName, password) => {
  const res = await fetchData({
    url: `${BASE_URL}/investments/${investmentId}`,
    method: HTTP_METHODS.DELETE,
    headers: {
      "Content-Type": "application/json",
    },
    data: { password },
  });
  return res.body;
};

/** TODO
 * 함수명 수정하기
 */
