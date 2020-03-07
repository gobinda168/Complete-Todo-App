import React from "react";
import { Pagination } from "./Pagination";

export const Paginations = ({ search, todos, itemPerPage, setId,currentPage }) => {
  return (
    <div>
      <div className="pagination">
        {(search ? [] : todos)
          .slice(0, Math.ceil(todos.length / itemPerPage))
          .map((t, i) => (
            <Pagination key={i} currentPage={currentPage} setId={setId} index={i} />
          ))}
      </div>
    </div>
  );
};
