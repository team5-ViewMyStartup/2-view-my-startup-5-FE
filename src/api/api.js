export const fetchCompanyData = async (companyId) => {
  const response = await fetch(`/companies/${companyId}`);
  if (!response.ok) throw new Error("기업 데이터를 불러오지 못했습니다");
  return await response.json();
};

export const fetchInvestmentsData = async (companyId) => {
  const response = await fetch(`/investments/${companyId}`);
  if (!response.ok) throw new Error("투자 데이터를 불러오지 못했습니다");
  return await response.json();
};
