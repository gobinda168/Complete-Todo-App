import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../Context/TodoContext/TodoContext";
import "./todos.style.scss";
import { Todo } from "../Todo/Todo";
import { Paginations } from "../Pagination/Paginations";
import { TodoHeader } from "./TodoHeader";
export const Todos = () => {
  const [isSorted, setIsSorted] = useState(true);
  const {
    todos,
    currentPage,
    itemPerPage,
    editedTodo,
    sortTodos,
    setId
  } = useContext(TodoContext);

  const [search, setSearch] = useState("");
  useEffect(() => {
    if (!editedTodo)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
  }, [editedTodo, todos]);
  const sort = () => {
    setIsSorted(!isSorted);
    sortTodos(isSorted);
  };
  //search filter
  const filteredTodos = todos
    .filter(todo =>
      todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .slice(currentPage * itemPerPage, currentPage * itemPerPage + itemPerPage);
  return (
    <div className="todos">
      <TodoHeader
        sort={sort}
        sorted={isSorted}
        onSearch={e => setSearch(e.currentTarget.value)}
      />
      <div className="todo-items">
        {filteredTodos.map((todo, index) => (
          <Todo todo={todo} i={index} key={todo.id} />
        ))}
      </div>
      <Paginations
        search={search}
        todos={todos}
        itemPerPage={itemPerPage}
        currentPage={currentPage}
        setId={setId}
      />
    </div>
  );
};
