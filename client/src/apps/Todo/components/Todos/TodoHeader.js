import React from "react";
import { Search } from "../Search/Search";

export const TodoHeader = ({ sort, onSearch, sorted }) => {
  return (
    <div>
      <div className="header">
        <h1>Todo App</h1>
        <div className="filters">
          <button onClick={sort}>{sorted ? "Sort" : " Sorted 👍 "}</button>
          <Search onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
};
