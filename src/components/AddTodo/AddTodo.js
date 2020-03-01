import React, { useEffect, useContext, useState } from "react";
import { TodoContext } from "../../Context/TodoContext/TodoContext";
import "./add-todo.scss";

export const AddTodo = () => {
  const [todo, setTodo] = useState({ id: null, task: "" });
  const [submit, setSubmit] = useState(false);
  const { addTodo, editedTodo, updateTodo, todos, clearTodo } = useContext(
    TodoContext
  );
  const handleSubmit = e => {
    e.preventDefault();
    if (editedTodo) {
      updateTodo({ ...editedTodo, task: todo.task });
      clearTodo();
    } else {
      addTodo({ ...todo, id: todos.length + 1 });
    }
    setSubmit(true);
  };
  useEffect(() => {
    if (editedTodo) setTodo(editedTodo);
    return () => {
      setTodo({ id: null, task: "" });
      setSubmit(false);
    };
  }, [editedTodo, submit]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="id"
          value={editedTodo ? editedTodo.id : todos.length + 1 || ""}
          readOnly
        />

        <input
          type="text"
          name="task"
          id="task"
          value={todo.task}
          onChange={e => setTodo({ ...todo, task: e.currentTarget.value })}
          placeholder="ADD TODO ITEM..."
        />
        <input
          type="submit"
          value={editedTodo ? "Update" : "Add"}
          disabled={todo.task ? false : true}
        />
      </form>
    </div>
  );
};
