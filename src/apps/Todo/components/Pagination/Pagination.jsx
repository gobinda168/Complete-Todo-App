import React from "react";
import "./pagination.style.scss";
export const Pagination = ({ index, setId, currentPage }) => {
  return (
    <div>
      <button
        className={currentPage === index ? "cbtn pbtn" : "pbtn"}
        onClick={() => setId(index)}
      >
        {index + 1}
      </button>
    </div>
  );
};
