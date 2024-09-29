import { useState } from "react";

const usePageHandler = (totalPages) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return { currentPage, handlePageChange, setCurrentPage };
};

export default usePageHandler;
