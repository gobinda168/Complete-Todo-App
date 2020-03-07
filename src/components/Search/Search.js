import React from "react";

export const Search = ({ onSearch }) => {
  return (
    <div>
      <input type="text" name="search" id="searc" onChange={onSearch} />
    </div>
  );
};
