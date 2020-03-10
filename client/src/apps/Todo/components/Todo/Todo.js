import React, { useContext, useState } from "react";
import "./todo.style.scss";
import { TodoContext } from "../../Context/TodoContext/TodoContext";
import { Actions } from "../Actions/Actions";
export const Todo = ({ todo, i }) => {
  const { itemPerPage, currentPage } = useContext(TodoContext);
  const [todoItemClicked, setTodoItemClicked] = useState(todo.completed);
  const newId = currentPage * itemPerPage + i + 1;
  return (
    <div className="todo-item">
      <p
        className={todoItemClicked ? "task-completed" : "id"}
        onClick={() => setTodoItemClicked(!todoItemClicked)}
      >
        {todoItemClicked ? (
          <i className="material-icons done-icon">done_all</i>
        ) : (
          newId
        )}
      </p>
      <p
        className={todoItemClicked ? "line item" : "item"}
        onClick={() => setTodoItemClicked(!todoItemClicked)}
      >
        {todo.title.substring(0, 30)}
      </p>
      <Actions todo={todo} newId={newId} />
    </div>
  );
};
