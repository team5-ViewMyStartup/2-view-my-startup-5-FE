import { getToken } from "../utils/jwtUtils";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const HTTP_METHODS = Object.freeze({
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
});

export async function fetchData({ url, method = HTTP_METHODS.GET, data, headers = {} }) {
  const token = getToken();
  const options = {
    method,
    headers: {
      ...headers,
    },
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error(`Error Details: ${errorDetails}`);
    throw new Error(`API 호출 실패: ${response.statusText}`);
  }

  const responseBody = await response.json();
  const responseHeaders = response.headers || {};

  return {
    body: responseBody,
    headers: responseHeaders,
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

export const updateInvestmentComment = async ({ investmentId, comment, password }) => {
  const token = getToken();

  const res = await fetchData({
    url: `${BASE_URL}/investments/${investmentId}`,
    method: HTTP_METHODS.PATCH,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: { comment, password },
  });
  return res.body;
};

export const deleteInvestment = async ({ investmentId, password }) => {
  const token = getToken();

  const res = await fetchData({
    url: `${BASE_URL}/investments/${investmentId}`,
    method: HTTP_METHODS.DELETE,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: { password },
  });
  return res.body;
};

export const addNewInvestment = async ({ companyId, amount, comment, password }) => {
  const res = await fetchData({
    url: `${BASE_URL}/investments`,
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      companyId,
      amount,
      comment,
      password,
    },
  });
  return res.body;
};

//회원가입
export const postSignUp = async ({ email, nickname, password }) => {
  const res = await fetchData({
    url: `${BASE_URL}/users`,
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id: uuidv4(),
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

  const authorizationHeader = res.headers.get("Authorization");

  if (!authorizationHeader) {
    throw new Error("Authorization 헤더가 없습니다.");
  }

  const [_, token] = authorizationHeader.split(" ");

  if (!token) {
    throw new Error("토큰을 추출할 수 없습니다.");
  }

  localStorage.setItem("token", token);

  return res.body;
};
