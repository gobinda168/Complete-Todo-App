import React, { useContext, useState } from "react";
import "./todo.style.scss";
import { TodoContext } from "../../Context/TodoContext/TodoContext";
export const Todo = ({ todo, i }) => {
  const { removeTodo, editTodo, moveDown, moveUp, itemPerPage, currentPage } = useContext(
    TodoContext
  );
  const [todoItemClicked, setTodoItemClicked] = useState(false);
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
      {/* {!todoItemClicked && ( */}
      <div className="actions">
        <button className="btn" onClick={() => removeTodo(todo.id)}>
          <i className="material-icons delete">delete</i>
        </button>
        <button className="btn" onClick={() => editTodo(todo)}>
          <i className="material-icons">edit</i>
        </button>
        <button className="btn" onClick={() => moveUp(newId - 1)}>
          <i className="material-icons">arrow_upward</i>
        </button>
        <button className="btn" onClick={() => moveDown(newId - 1)}>
          <i className="material-icons">arrow_downward</i>
        </button>
      </div>
      {/* )} */}
    </div>
  );
};
