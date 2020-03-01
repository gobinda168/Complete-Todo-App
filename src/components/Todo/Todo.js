import React, { useContext, useState } from "react";
import "./todo.style.scss";
import { TodoContext } from "../../Context/TodoContext/TodoContext";
export const Todo = ({ todo, i }) => {
  const { removeTodo, editTodo, moveDown, moveUp } = useContext(TodoContext);
  const [todoItemClicked, setTodoItemClicked] = useState(false);

  return (
    <div className="todo-item">
      <p className="id">{i + 1}</p>
      <p
        className={todoItemClicked ? "line item" : "item"}
        onClick={() => setTodoItemClicked(!todoItemClicked)}
      >
        {todo.task}
      </p>
      <div className="actions">
        <button className="btn" onClick={() => removeTodo(todo.id)}>
          <i className="material-icons delete">delete</i>
        </button>
        <button className="btn" onClick={() => editTodo(todo)}>
          <i className="material-icons">edit</i>
        </button>
        <button className="btn" onClick={() => moveUp(i)}>
          <i className="material-icons">arrow_upward</i>
        </button>
        <button className="btn" onClick={() => moveDown(i)}>
          <i className="material-icons">arrow_downward</i>
        </button>
      </div>
    </div>
  );
};
