import React, { useState } from "react";
import "./List.css";
import TodoItem from "../TodoItem/TodoItem";
import { FaTrash } from "react-icons/fa";

const List = ({ todoList, onDelete, onUpdate, onDeleteAll }) => {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    let filtered = todoList;

    if (filter === "active") {
      filtered = filtered.filter((todo) => !todo.isComplete);
    }

    if (filter === "completed") {
      filtered = filtered.filter((todo) => todo.isComplete);
    }

    if (search !== "") {
      filtered = filtered.filter((todo) =>
        todo.task.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTodos = getFilteredData();

  return (
    <div className="List">
      <div className="List_filter">
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <button className="clear-all" onClick={onDeleteAll}>
          <FaTrash />
        </button>
      </div>

      <input
        onChange={onChangeSearch}
        value={search}
        placeholder="Search todos..."
      />

      <div className="Todo_Wrapper">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              id={todo._id}
              item={todo}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <div className="empty">
            <p>No todos found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
