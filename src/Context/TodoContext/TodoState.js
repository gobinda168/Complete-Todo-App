import React, { useReducer } from "react";
import { TodoContext } from "./TodoContext";
import todoReducer from "./todoReducer";
import {
  ADD_TODO_ITEM,
  DELETE_TODO,
  UPDATE_TODO,
  EDIT_TODO,
  CLEAR
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

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
        editTodo,
        editedTodo: state.editedTodo,
        clearTodo
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
