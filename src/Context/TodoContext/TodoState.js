import React, { useReducer, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import todoReducer from "./todoReducer";
import axios from "axios";
import {
  ADD_TODO_ITEM,
  DELETE_TODO,
  UPDATE_TODO,
  EDIT_TODO,
  CLEAR,
  UP,
  DOWN,
  INIT,
  SETID
} from "../keys";

export const TodoState = props => {
  const fetchTodos = async n => {
    // console.log(n);
    let start = n * 10 - 10,
      end = n * 10;
    const { data } = await axios(`https://jsonplaceholder.typicode.com/todos`);
    dispatch({ type: INIT, payload: data.slice(start || 0, end || 10) });
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  const initialState = {
    editedTodo: null,
    todos: [],
    currentPage: 0
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);

  //?Actions for reducer
  const setId = i => {
    dispatch({ type: SETID, payload: i });
  };
  const addTodo = t => {
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
        moveUp,
        fetchTodos,
        setId,
        currentPage: state.currentPage
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
