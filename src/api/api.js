const BASE_URL = process.env.REACT_APP_BASE_URL;

const HTTP_METHODS = Object.freeze({
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
});

export async function fetchData({ url, method = HTTP_METHODS.GET, data, headers = {} }) {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      ...headers,
    },
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  } else {
    throw new Error("로그인 상태가 아닙니다.");
  }

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

export const addNewInvestment = async (companyId, investorName, amount, comment, password) => {
  const res = await fetchData({
    url: `${BASE_URL}/investments`,
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      companyId,
      investorName,
      amount,
      comment,
      password,
    },
  });
  return res.body;
};

//회원가입
export const postSignUp = async (email, nickname, password) => {
  const res = await fetchData({
    url: `${BASE_URL}/users`,
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
      nickname,
      password,
    },
  });
  return res.body;
};

//로그인
export const postSignIn = async (email, password) => {
  const res = await fetchData({
    url: `${BASE_URL}/users/signIn`,
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
      password,
    },
  });

  const token = res.body.token;
  if (token) {
    localStorage.setItem("token", token);
  }
  return res.body;
};

/** TODO
 * 함수명 수정하기
 */
