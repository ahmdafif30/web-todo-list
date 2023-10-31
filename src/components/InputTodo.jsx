/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, filterTodo } from "../redux/reducers/todo-reducer";
import TodoList from "./TodoList";

const InputTodo = () => {
  const { isEdit, todos, filter, filterType } = useSelector((state) => state.todos);
  const { ALL, ACTIVE, COMPLETED } = filterType;

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input === "") {
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 2000);
      return false;
    }
    if (!isEdit) {
      dispatch(addTodo(input));
    } else {
      dispatch(editTodo(input));
    }

    setInput("");

    if (filter === "active") {
      dispatch(filterTodo(ACTIVE));
    } else if (filter === "completed") {
      dispatch(filterTodo(COMPLETED));
    }
  };

  const [alert, setAlert] = useState(false);

  return (
    <div className="pt-20">
      <h1 className="font-semibold text-4xl text-slate-600 mb-10 text-center">Todo List</h1>

      {/* <button onClick={() => setAlert(!alert)}>alert woiiiii</button> */}

      <div role="alert" className={`absolute top-5 left-20 transition-all duration-500 ease-in-out drop-shadow-lg ${alert === true ? "opacity-100" : "opacity-0"}`}>
        <div className="bg-red-800 text-white font-bold px-4 py-2">Alert !</div>
        <div className="border border-t-0 border-red-400 rounded-b bg-white px-4 py-3 text-red-500">
          <p>Masukkan Todo terlebih dahulu.</p>
        </div>
      </div>

      <form className="flex">
        <input className="grow rounded-md p-3 border-2 border-slate-400 bg-transparent text-slate-700" type="text" placeholder="Masukkan Todo" value={input} onChange={handleChange} />
        <button className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-900 ml-4 text-white" onClick={handleSubmit}>
          {isEdit ? "Edit" : "Tambahkan"}
        </button>
      </form>

      {/* render list todo */}
      <TodoList setInput={setInput} />
    </div>
  );
};

export default InputTodo;
