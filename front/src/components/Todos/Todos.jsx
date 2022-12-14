import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos } from "../../features/todoSlice";
import Todo from "./Todo";
import "./loading.css"
const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const hendleAdd = (e) => {
    e.preventDefault();
    dispatch(addTodo({ text }));
    setText("")
  };
  if (loading) {
    return(<div className="loader">
    <div className="scanner">
      <span>Собар...</span>
    </div>
  </div>);
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  
  return (
    <>
      <form className="form">
        <input className="input"
          text={text}
          value={text}
          placeholder="цхьаъ яз е..."
          onChange={(e) => setText(e.target.value)}
        />
        <button className="icon-btn add-btn" onClick={(e) => hendleAdd(e)}>
        <div className="add-icon"></div>

        <div className="btn-txt">Add</div>
            </button>
      </form>
      <ul className="ListUl">
        {todos.map((todo) => {
          return (
            <Todo
              key={todo._id}
              id={todo._id}
              loading={todo.loading}
              title={todo.title}
              completed={todo.completed}
            />
          );
        }).reverse()}
      </ul>
    </>
  );
};

export default Todos;
