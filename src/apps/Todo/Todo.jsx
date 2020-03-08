import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { TodoState } from "./Context/TodoContext/TodoState";
import { Todos } from "./components/Todos/Todos";
import { AddTodo } from "./components/AddTodo/AddTodo";
import "react-toastify/dist/ReactToastify.css";

export const TodoApp = () => {
  return (
    <TodoState>
      <div className="App">
        <AddTodo />
        <Todos />
        <ToastContainer />
      </div>
    </TodoState>
  );
};
