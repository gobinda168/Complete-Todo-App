import React, { useReducer } from "react";
import { TodoContext } from "./TodoContext";
import todoReducer from "./todoReducer";
import {
  ADD_TODO_ITEM,
  DELETE_TODO,
  UPDATE_TODO,
  EDIT_TODO,
  CLEAR,
  UP,
  DOWN
} from "../keys";

export const TodoState = props => {
  const initialState = {
    editedTodo: null,
    todos: [{ id: 1, task: "Walking" }]
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const addTodo = t => {
    // const id = uuid();
    // const todo = { id: id, task: t };
    dispatch({ type: ADD_TODO_ITEM, payload: t });
  };
  const removeTodo = id => {
    dispatch({ type: DELETE_TODO, payload: id });
  };
  const updateTodo = todo => {
    dispatch({ type: UPDATE_TODO, payload: todo });
  };
  const editTodo = todo => {
    dispatch({ type: EDIT_TODO, payload: todo });
  };
  const clearTodo = () => {
    dispatch({ type: CLEAR });
  };
  const moveDown = id => {
    if (id >= state.todos.length - 1) return;
    else {
      let newTodos = [...state.todos];
      let todo = newTodos[id + 1];
      newTodos[id + 1] = newTodos[id];
      newTodos[id] = todo;
      dispatch({ type: DOWN, payload: newTodos });
    }
  };
  const moveUp = id => {
    if (id <= 0) return;
    else {
      let newTodos = [...state.todos];
      let todo = newTodos[id - 1];
      newTodos[id - 1] = newTodos[id];
      newTodos[id] = todo;
      dispatch({ type: UP, payload: newTodos });
    }
  };
  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
        editTodo,
        editedTodo: state.editedTodo,
        clearTodo,
        moveDown,
        moveUp
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
