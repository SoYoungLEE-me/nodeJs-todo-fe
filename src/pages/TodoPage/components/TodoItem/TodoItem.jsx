import React from "react";
import "./TodoItem.css";
import { FaTrash } from "react-icons/fa";

const TodoItem = ({ id, item, onDelete, onUpdate }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR");
  };

  const onChangeCheckBox = () => {
    onUpdate(id);
  };

  const onDeleteTodo = () => {
    const isConfirmed = window.confirm(
      "This action cannot be undone. Do you want to delete this task?"
    );

    if (isConfirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="TodoItem">
      <input
        readOnly
        type="checkbox"
        onChange={onChangeCheckBox}
        checked={item.isComplete}
      />
      <div className={`content ${item.isComplete ? "done" : ""}`}>
        {item.task}
      </div>
      <div className={`author ${item.isComplete ? "done" : ""}`}>
        {item.author.name}
      </div>
      <div className="date">
        {item.isComplete
          ? `Completed: ${formatDate(item.updatedAt)}`
          : formatDate(item.createdAt)}
      </div>
      <button onClick={onDeleteTodo}>
        <FaTrash />
      </button>
    </div>
  );
};

export default TodoItem;
