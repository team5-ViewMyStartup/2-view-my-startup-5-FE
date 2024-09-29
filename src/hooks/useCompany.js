import { useEffect, useState } from "react";

const useCompany = (page = 1, pageSize = 10, orderBy = "investment-high") => {
  const [company, setCompany] = useState([]);
  const [companyNum, setCompanyNum] = useState(0);
  const [isLoadedData, setIsLoadedData] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      setIsLoadedData(true);
      try {
        const response = await fetch(`/allCompanyData.json`);
        const data = await response.json();
        console.log("data:", data);
        if (data) {
          setCompany(response.data.list);
          setCompanyNum(response.data.length);
          console.log("if:", 1);
        } else {
          setCompany([]);
          setCompanyNum(0);
          console.log("elseif:", 2);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompany([]);
        setCompanyNum(0);
      }
      setIsLoadedData(false);
    };

    fetchCompany();
  }, [page, orderBy]);

  return { company, companyNum, isLoadedData };
};

export default useCompany;
