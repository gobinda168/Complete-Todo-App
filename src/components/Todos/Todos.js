import React, { useContext } from "react";
import { TodoContext } from "../../Context/TodoContext/TodoContext";
import "./todos.style.scss";
import { Todo } from "../Todo/Todo";
export const Todos = () => {
  const { todos } = useContext(TodoContext);
  return (
    <div className="todos">
      {todos.map((todo, index) => (
        <Todo todo={todo} i={index} key={todo.id} />
      ))}
    </div>
  );
};
