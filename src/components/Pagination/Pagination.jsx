import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange, hasNext }) => {
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = math.min(startPage + 4, totalPages);

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.button} ${styles.leftButton}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <div className={styles.pageNumberButton}>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => onPageChange(startPage + index)}
            className={`${styles.button} ${startPage + index === currentPage ? styles.active : ""}`}
          >
            {startPage + index}
          </button>
        ))}
      </div>
      <button
        className={`${styles.button} ${styles.rightButton}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext || currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
