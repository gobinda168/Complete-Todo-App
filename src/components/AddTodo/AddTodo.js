import React, { useEffect, useContext, useRef, useState } from "react";
import { TodoContext } from "../../Context/TodoContext/TodoContext";
import "./add-todo.scss";

export const AddTodo = () => {
  const [todo, setTodo] = useState({ id: null, title: "" });
  const [submit, setSubmit] = useState(false);
  const { addTodo, editedTodo, updateTodo, todos, clearTodo } = useContext(
    TodoContext
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (editedTodo) {
      updateTodo({ ...editedTodo, title: todo.title });
      clearTodo();
    } else {
      addTodo({ ...todo, id: todos.length + 1 });
    }
    setSubmit(true);
  };
  useEffect(() => {
    if (editedTodo) setTodo(editedTodo);
    return () => {
      setTodo({ id: null, title: "" });
      setSubmit(false);
    };
  }, [editedTodo, submit]);
  const textInput = useRef();
  useEffect(() => {
    if (editedTodo) return textInput.current.focus();
    else return textInput.current.blur();
  }, [editedTodo]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="id"
          value={
            editedTodo
              ? "Task ID: " + (todos.indexOf(editedTodo) + 1)
              : "Total Tasks: " + todos.length
          }
          readOnly
        />

        <input
          type="text"
          name="title"
          id="title"
          ref={textInput}
          value={todo.title}
          onChange={e => setTodo({ ...todo, title: e.currentTarget.value })}
          placeholder="ADD TODO ITEM..."
        />
        <input
          type="submit"
          value={editedTodo ? "Update" : "Add"}
          disabled={todo.title ? false : true}
        />
      </form>
    </div>
  );
};
