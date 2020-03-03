import React, { useContext } from "react";
import { TodoContext } from "../../Context/TodoContext/TodoContext";

export const Pagination = ({ index }) => {
  const { fetchTodos, setId } = useContext(TodoContext);
  const handleClick = () => {
    fetchTodos(index + 1);
    setId(index);
  };
  return (
    <div>
      <button onClick={() => handleClick()}>{index + 1}</button>
    </div>
  );
};
