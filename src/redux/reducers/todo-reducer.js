const initialValue = {
  todos: [
  ],
  isEdit: null,
  filter: "all",
  filterTodos: [],
  filterType: {
    ALL: "FILTER_ALL",
    ACTIVE: "FILTER_ACTIVE",
    COMPLETED: "FILTER_COMPLETED",
  },
};

function todoReducer(state = initialValue, action) {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo = {
        id: state.todos.length + 1,
        value: action.payload,
        completed: false,
        isEdit: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };

    case "COMPLETE_TODO":
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        }),
      };

    case "START_EDIT":
      return {
        ...state,
        isEdit: action.payload,
      };

    case "EDIT_TODO":
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === state.isEdit) {
          return { ...todo, value: action.payload };
        }
        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
        isEdit: null,
      };
    case "FILTER_ACTIVE":
      const activeTodos = state.todos.filter(
        (item) => item.completed === false
      );

      return {
        ...state,
        filterTodos: activeTodos,
        filter: "active",
      };
    case "FILTER_ALL":
      return {
        ...state,
        filterTodos: [],
        filter: "all",
      };
    case "FILTER_COMPLETED":
      const completedTodos = state.todos.filter(
        (item) => item.completed === true
      );
      return {
        ...state,
        filterTodos: completedTodos,
        filter: "completed",
      };
    default:
      return state;
  }
}

export function addTodo(value) {
  return {
    type: "ADD_TODO",
    payload: value,
  };
}

export function deleteTodo(id) {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
}

export function completeTodo(id) {
  return {
    type: "COMPLETE_TODO",
    payload: id,
  };
}

export function editTodo(value) {
  return {
    type: "EDIT_TODO",
    payload: value,
  };
}

export function startEdit(id) {
  return {
    type: "START_EDIT",
    payload: id,
  };
}

export function filterTodo(filter) {
  return {
    type: filter,
  };
}

export default todoReducer;
