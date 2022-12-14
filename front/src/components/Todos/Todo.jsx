import React from "react";
import { useDispatch } from "react-redux";
import { completeTodo, deleteTodo } from "../../features/todoSlice";
import "./style.css"

const Todo = ({ id, title, completed, loading }) => {
  const dispatch = useDispatch();

  const handleChecked = () => {
    dispatch(completeTodo({ id, completed }));
  };

  const hendleRemove = () => {
    dispatch(deleteTodo({id}))
  }


  if (loading) {
    return "....";
  }
  return (
    <li className="classList">
    <button className="btn" onClick={hendleRemove}>Удалить</button>
      {title}
      <label  className="container">
        <input type="checkbox" checked={completed} onChange={handleChecked} />
        <div className="checkmark"></div>

      </label>

    </li>
  );
};

export default Todo;
