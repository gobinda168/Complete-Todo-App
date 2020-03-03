import React, { useContext } from "react";
import { TodoContext } from "../../Context/TodoContext/TodoContext";
import "./todos.style.scss";
import { Todo } from "../Todo/Todo";
import { Pagination } from "../Pagination/Pagination";
export const Todos = () => {
  const { todos, currentPage, itemPerPage } = useContext(TodoContext);
  const newTodo = todos.slice(
    currentPage * itemPerPage,
    currentPage * itemPerPage + itemPerPage
  );
  return (
    <div className="todos">
      {newTodo.map((todo, index) => (
        <Todo todo={todo} i={index} key={todo.id} />
      ))}
      <div className="pagination">
        {todos.slice(0, Math.ceil(todos.length / itemPerPage)).map((t, i) => (
          <Pagination key={t.id} item={t} index={i} />
        ))}
      </div>
    </div>
  );
};
