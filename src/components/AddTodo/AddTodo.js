import React, { useEffect, useContext, useState } from "react";
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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="id"
          value={editedTodo ? todos.indexOf(editedTodo) + 1 : todos.length + 1}
          readOnly
        />
        <input
          type="text"
          name="title"
          id="title"
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
