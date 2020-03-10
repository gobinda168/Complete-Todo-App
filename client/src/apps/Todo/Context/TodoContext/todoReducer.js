import {
  ADD_TODO_ITEM,
  DELETE_TODO,
  UPDATE_TODO,
  EDIT_TODO,
  CLEAR,
  DOWN,
  UP,
  INIT,
  SETID,
  SORT_TODOS
} from "../keys";

export default (state, { type, payload }) => {
  switch (type) {
    case SORT_TODOS:
      return { ...state, sorted: payload };
    case SETID:
      return { ...state, currentPage: payload };
    case INIT:
      return { ...state, todos: [...payload] };
    case ADD_TODO_ITEM:
      return { ...state, todos: [payload, ...state.todos] };
    case DELETE_TODO:
      return { ...state, todos: state.todos.filter(t => t.id !== payload) };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(t => (t.id === payload.id ? payload : t)),
        editedTodo: null
      };

    case EDIT_TODO:
      return {
        ...state,
        editedTodo: payload
      };
    case CLEAR:
      return {
        ...state,
        editedTodo: null
      };
    case DOWN:
      return {
        ...state,
        todos: [...payload]
      };
    case UP:
      return {
        ...state,
        todos: [...payload]
      };
    default:
      return state;
  }
};
