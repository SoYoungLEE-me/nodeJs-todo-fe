import { useEffect, useState } from "react";
import "./App.css";
import Editor from "./components/Editor/Editor";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);

  const getTasks = async () => {
    const response = await api.get("/tasks");
    setTodoList(response.data.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const onCreate = async (content) => {
    try {
      await api.post("/tasks", {
        task: content,
      });

      getTasks();
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  const onDelete = async (targetId) => {
    try {
      await api.delete(`/tasks/${targetId}`);

      getTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const onUpdate = async (targetId) => {
    try {
      const targetTodo = todoList.find((item) => item._id === targetId);

      await api.put(`/tasks/${targetId}`, {
        isComplete: !targetTodo.isComplete,
      });

      getTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const onDeleteAll = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (!isConfirmed) return;

    try {
      await api.delete("/tasks");
      getTasks();
    } catch (error) {
      console.error("Failed to delete all tasks", error);
    }
  };
  return (
    <>
      <div className="App">
        <Header />
        <Editor onCreate={onCreate} />
        <List
          todoList={todoList}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onDeleteAll={onDeleteAll}
        />
      </div>
    </>
  );
}

export default App;
