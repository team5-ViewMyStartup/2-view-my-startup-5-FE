const BASE_URL = "http://localhost:3000";

export const fetchCompanyData = async (companyId) => {
  const response = await fetch(`${BASE_URL}//companies/${companyId}`);
  if (!response.ok) throw new Error("기업 데이터를 불러오지 못했습니다");
  return await response.json();
};

export const fetchInvestmentsData = async (companyId) => {
  //const base_url = local:3000
  const response = await fetch(`${BASE_URL}/investments/${companyId}`);
  if (!response.ok) throw new Error("투자 데이터를 불러오지 못했습니다");
  return await response.json();
};
