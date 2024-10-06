const BASE_URL = "http://localhost:4000";

export const fetchCompanyData = async () => {
  const response = await fetch(`${BASE_URL}/companies`);
  if (!response.ok) throw new Error("기업 데이터를 불러오지 못했습니다");
  return await response.json();
};

export const fetchDetailCompanyData = async (companyId) => {
  const response = await fetch(`${BASE_URL}/companies/${companyId}`);
  if (!response.ok) throw new Error("기업 데이터를 불러오지 못했습니다");
  return await response.json();
};

// 상세 페이지

export const fetchInvestmentsData = async (companyId) => {
  const response = await fetch(`${BASE_URL}/investments/${companyId}`);
  if (!response.ok) throw new Error("투자 데이터를 불러오지 못했습니다");
  return await response.json();
};

export const updateInvestmentComment = async (investmentId, investorName, comment, password) => {
  const response = await fetch(`${BASE_URL}/investments/${investmentId}}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ investmentId, investorName, comment, password }),
  });

  if (!response.ok) throw new Error("코멘트 수정에 실패했습니다");

  return await response.json();
};

export const deleteInvestment = async (investmentId, investorName, password) => {
  const response = await fetch(`${BASE_URL}/investments/${investmentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ investorName, password }),
  });

  if (!response.ok) throw new Error("투자 정보 삭제에 실패했습니다");

  return await response.json();
};
