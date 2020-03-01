import React from "react";
import "./App.css";
import { TodoState } from "./Context/TodoContext/TodoState";
import { Todos } from "./components/Todos/Todos";
import { AddTodo } from "./components/AddTodo/AddTodo";

function App() {
  return (
    <TodoState>
      <div className="App">
        <AddTodo  />
        <Todos />
      </div>
    </TodoState>
  );
}

export default App;
