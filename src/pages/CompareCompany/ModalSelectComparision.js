import React, { useEffect, useState, useMemo, useCallback } from "react";
import { debounce } from "lodash";
import style from "./ModalSelectComparision.module.css";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import SelectBtn from "./SelectBtn";
import IcCloseX from "../../imagesjun/ic_delete.png";
import { companiesMockData } from "./mockData";

const AdditionalModal = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCompanies = companiesMockData.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContainer}>
        <div className={style.modalContent}>
          <h2>추가 기업 선택</h2>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <ul className={style.companyColumnsHug}>
            {filteredCompanies.map((company) => (
              <li key={company.name} className={style.companyColumns}>
                <div className={style.companyColumnsLogoTextHug}>
                  <img
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    className={style.companyLogo}
                  />
                  <div className={style.companyColumnsNameCategoryHug}>
                    <div className={style.companyColumnsName}>{company.name}</div>
                    <div className={style.companyColumnsCategory}>{company.category}</div>
                  </div>
                </div>
                <SelectBtn onClick={() => onSelect(company)} text="선택하기" status="default" />
              </li>
            ))}
          </ul>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

const ModalSelectComparision = ({
  isOpen,
  onClose,
  title,
  autoClose = false,
  preSelectedCompanies = [],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdditionalModalOpen, setIsAdditionalModalOpen] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const companies = companiesMockData;
    setSelectedCompanies(companies.slice(0, 2)); // 초기 선택 기업
    setCompanyList(companies); // 전체 기업 목록
  }, []);

  useEffect(() => {
    setSelectedCompanies(preSelectedCompanies);
  }, [preSelectedCompanies, isOpen]);

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const filteredCompanies = companiesMockData.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setCompanyList(filteredCompanies);
    } catch (error) {
      console.error("목데이터를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchCompanies = useMemo(() => debounce(fetchCompanies, 200), [searchTerm]);

  useEffect(() => {
    if (isOpen && searchTerm) {
      debouncedFetchCompanies();
    }
    return () => {
      debouncedFetchCompanies.cancel();
    };
  }, [isOpen, searchTerm, debouncedFetchCompanies]);

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleSelect = useCallback(
    (company) => {
      if (selectedCompanies.length >= 5) {
        setError("*비교할 기업은 최대 5개까지 선택 가능합니다.");
        return;
      }

      if (!selectedCompanies.some((selected) => selected.name === company.name)) {
        setSelectedCompanies((prev) => [...prev, company]);
        setError("");

        if (autoClose) {
          onClose([...selectedCompanies, company]);
        }
      }
    },
    [selectedCompanies, onClose, autoClose],
  );

  const handleDeselect = useCallback((companyName) => {
    setSelectedCompanies((prev) => prev.filter((company) => company.name !== companyName));
    setError("");
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const currentCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return companyList.slice(startIndex, startIndex + itemsPerPage);
  }, [companyList, currentPage, itemsPerPage]);

  const handleClose = () => {
    onClose(selectedCompanies);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const openAdditionalModal = () => {
    setIsAdditionalModalOpen(true);
  };

  const closeAdditionalModal = () => {
    setIsAdditionalModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={style.modalOverlay} onClick={handleOverlayClick}>
        <div className={style.modalContainer}>
          <div className={style.modalContent}>
            <div className={style.modalHeadText}>
              {title}
              <img
                src={IcCloseX}
                className={style.deleteLogo}
                alt="deleteLogo"
                onClick={handleClose}
              />
            </div>

            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              onClear={() => handleSearchChange("")}
              onSearch={() => debouncedFetchCompanies()}
            />

            {selectedCompanies.length > 0 && (
              <div className={style.compare_head_wrapper}>
                <h1 className={style.compare_heading_text}>어떤 기업이 궁금하세요?</h1>
                <p>(최대 5개)</p>
                <div className={style.reset_btn_wrapper}>
                  <button className={style.reset_btn} onClick={openAdditionalModal}>
                    기업 추가하기
                  </button>
                </div>
                <ul className={style.companyColumnsHug}>
                  {selectedCompanies.map((company) => (
                    <li key={company.name} className={style.companyColumns}>
                      <div className={style.companyColumnsLogoTextHug}>
                        <img
                          src={company.logoUrl}
                          alt={`${company.name} logo`}
                          className={style.companyLogo}
                        />
                        <div className={style.companyColumnsNameCategoryHug}>
                          <div className={style.companyColumnsName}>{company.name}</div>
                          <div className={style.companyColumnsCategory}>{company.category}</div>
                        </div>
                      </div>
                      <SelectBtn
                        onClick={() => handleDeselect(company.name)}
                        text="선택 해제"
                        status="deselected"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {searchTerm && companyList.length > 0 && (
              <>
                <ul className={style.companyColumnsHug}>
                  {currentCompanies.map((company) => (
                    <li key={company.name} className={style.companyColumns}>
                      <div className={style.companyColumnsLogoTextHug}>
                        <img
                          src={company.logoUrl}
                          alt={`${company.name} logo`}
                          className={style.companyLogo}
                        />
                        <div className={style.companyColumnsNameCategoryHug}>
                          <div className={style.companyColumnsName}>{company.name}</div>
                          <div className={style.companyColumnsCategory}>{company.category}</div>
                        </div>
                      </div>

                      {selectedCompanies.some((selected) => selected.name === company.name) ? (
                        <SelectBtn
                          onClick={() => handleDeselect(company.name)}
                          text="선택완료"
                          status="selected"
                        />
                      ) : (
                        <SelectBtn
                          onClick={() => handleSelect(company)}
                          text="선택하기"
                          status="default"
                        />
                      )}
                    </li>
                  ))}
                </ul>
                {error && <div className={style.errorMessage}>{error}</div>}
              </>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(companyList.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <AdditionalModal
        isOpen={isAdditionalModalOpen}
        onClose={closeAdditionalModal}
        onSelect={handleSelect}
      />
    </>
  );
};

export default ModalSelectComparision;
