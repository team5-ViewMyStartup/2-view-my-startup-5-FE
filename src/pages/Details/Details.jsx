import React, { useEffect, useState } from "react";
import select_icon from "../../images/select_img.svg";
import styles from "./Details.module.css";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { fetchDetailCompanyData, fetchInvestmentsData } from "../../api/api";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

const ITEM_PER_PAGE = 5;

function Details() {
  const { companyId, id } = useParams();
  const [company, setCompany] = useState();
  const [investments, setInvestments] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const totalInvestmentAmount = investments
    ? investments.reduce((total, investment) => {
        return total + investment.amount;
      }, 0)
    : 0;

  const indexOfLastItem = currentPage * ITEM_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEM_PER_PAGE;
  const currentInvestments =
    investments.length > 0
      ? [...investments]
          .sort((a, b) => b.amount - a.amount)
          .slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const openDeleteModal = (investment) => {
    setSelectedInvestment(investment);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedInvestment(null);
  };

  const openEditModal = (investment) => {
    setSelectedInvestment(investment);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedInvestment(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyData = await fetchDetailCompanyData(companyId);
        setCompany(companyData);

        const investmentData = await fetchInvestmentsData(companyId);
        setInvestments(investmentData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [companyId]);

  if (!company) {
    return <div>데이터 불러오지 못했습니다</div>;
  }

  const totalPages = Math.ceil(investments.length / ITEM_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleImgClick = (index) => {
    toggleDropdown(index);
  };

  const corporateField = [
    {
      title: "누적 투자 금액",
      value: `${totalInvestmentAmount} 억 원`,
      className: "",
    },
    {
      title: "매출액",
      value: `${company.revenue} 억 원`,
      className: `${styles.account}`,
    },
    {
      title: "고용 인원",
      value: `${company.employees} 명`,
      className: "",
    },
  ];

  return (
    <div className={styles.corporate}>
      <div className={styles.corporate_information}>
        <div className={styles.corporate_wrapper}>
          <img src={company.image} alt="임시이미지" width="20px" />
          <div className={styles.corporate_name}>
            <h3>{company.name}</h3>
            <h4 className={styles.cor_type}>{company.category}</h4>
          </div>
        </div>
        <hr />
        <div className={styles.corporate_status}>
          <div className={styles.overview_wrapper}>
            {corporateField.map((field, index) => (
              <div key={index} className={`${styles.overview} ${field.className}`}>
                <h5>{field.title}</h5>
                <p>{field.value}</p>
              </div>
            ))}
          </div>
          <div className={styles.introduction}>
            <h5>기업 소개</h5>
            <p>{company.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.investment_received}>
        <div className={styles.invest_wrapper}>
          <h3>View My Startup에서 받은 투자</h3>
          <button className={styles.invest_button}>기업투자하기</button>
        </div>
        <hr />
        {/* {company.investments.length === 0 ? ( */}
        {/* // <div className={styles.no_investment}> */}
        {/* <p>아직 투자한 기업이 없어요.</p> */}
        {/* <p>버튼을 눌러 기업에 투자해보세요!</p> */}
        {/* </div> */}
        {/* // ) : ( */}
        <>
          <div>
            <h3>총 {totalInvestmentAmount} 억원</h3>
          </div>
          <div className={styles.investment_container}>
            <ul className={styles.investment_list}>
              <li className={styles.investment_header}>
                <span className={styles.invest_inform}>순위</span>
                <span className={styles.invest_inform}>투자자 이름</span>
                <span className={styles.invest_inform}>투자 금액</span>
                <span className={styles.investment_comment}>투자 코멘트</span>
              </li>
              {currentInvestments.map((investment, index) => (
                <li key={index + indexOfFirstItem} className={styles.investment_item}>
                  <span className={styles.invest_inform}>{index + indexOfFirstItem + 1} 위</span>
                  <span className={styles.invest_inform}>{investment.investorName}</span>
                  <span className={styles.invest_inform}>{investment.amount} 억 원</span>
                  <span className={styles.comment_content}>{investment.comment}</span>
                  <span className={styles.select_box}>
                    <div onClick={() => handleImgClick(index + indexOfFirstItem)}>
                      <img src={select_icon} alt="select icon" className={styles.select_img} />
                    </div>
                    {activeDropdown === index + indexOfFirstItem && (
                      <div className={styles.dropdown_select}>
                        <div className={styles.dropbox_item}>
                          <ul>
                            <li
                              className={styles.dropbox_item}
                              onClick={() => openEditModal(investment)}
                            >
                              수정하기
                            </li>
                            <div className={styles.line}></div>
                            <li
                              className={`${styles.dropbox_item} ${styles.dropbox_item_last}`}
                              onClick={() => openDeleteModal(investment)}
                            >
                              삭제하기
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      </div>
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          isClose={closeDeleteModal}
          investment={selectedInvestment}
        />
      )}
      {editModalOpen && (
        <EditModal
          isOpen={editModalOpen}
          isClose={closeEditModal}
          investment={selectedInvestment}
          onSave={(updatedInvestment) => {
            const updatedInvestments = company.investments.map((invest) =>
              invest.id === updatedInvestment.id
                ? { ...invest, comment: updatedInvestment.comment }
                : invest,
            );
            setCompany((prevCompany) => ({
              ...prevCompany,
              investments: updatedInvestments,
            }));
            closeEditModal();
          }}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        hasNext={currentPage < totalPages}
      />
    </div>
  );
}

export default Details;
