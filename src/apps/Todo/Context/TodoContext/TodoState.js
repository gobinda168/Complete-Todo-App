import React, { useReducer, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import todoReducer from "./todoReducer";
import { toast } from "react-toastify";
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
  SETID,
  SORT_TODOS
} from "../keys";

export const TodoState = props => {
  const initialState = {
    editedTodo: null,
    todos: [],
    currentPage: 0,
    itemPerPage: 10,
    sorted: false
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);
  useEffect(() => {
    fetchTodos(state.sorted);
  }, [state.sorted]);
  //?Actions for reducer
  const sortTodos = sort => {
    toast.success(`Tasks sorted successfully`);
    dispatch({ type: SORT_TODOS, payload: sort });
  };
  const fetchTodos = async sorted => {
    // console.log(n);
    const { data } = await axios(`https://jsonplaceholder.typicode.com/todos`);
    const newData = sorted
      ? await data.sort(a => (a.completed ? 1 : -1))
      : data;
    dispatch({ type: INIT, payload: newData });
  };
  const setId = i => {
    dispatch({ type: SETID, payload: i });
  };
  const addTodo = t => {
    toast.success(`Task added successfully`);
    dispatch({ type: ADD_TODO_ITEM, payload: t });
  };
  const removeTodo = id => {
    toast.error(`Task removed successfully`);
    dispatch({ type: DELETE_TODO, payload: id });
  };
  const updateTodo = todo => {
    toast.success(`Task updated successfully`);
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
        currentPage: state.currentPage,
        itemPerPage: state.itemPerPage,
        sortTodos
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
