import React, { useContext } from "react";
import { TodoContext } from "../../Context/TodoContext/TodoContext";

export const Actions = ({ todo, newId }) => {
  const { removeTodo, editTodo, moveDown, moveUp } = useContext(TodoContext);
  return (
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
  );
};
