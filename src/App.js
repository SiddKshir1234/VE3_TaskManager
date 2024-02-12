import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import TaskForm from "./components/TaskForm";
import EditTaskForm from "./components/EditTaskForm";
import "./App.css";

const App = () => {
  // State hooks for managing tasks and the task being edited
  const [tasks, setTasks] = useState([]);

  // Hook for navigating within the Router
  const [editTaskId, setEditTaskId] = useState(null);

  // Function to fetch tasks from the server
  const fetchTasks = async () => {
    try {
      // Fetching task details from the API
      const response = await fetch("http://localhost:5000/tasks");

      // Checking if the response is successful
      if (!response.ok) {
        // Logging an error message if fetching fails
        throw new Error("Error fetching tasks");
      }
      const tasksData = await response.json();
      // Updating the state with task details
      setTasks(tasksData);
    } catch (error) {
      // Logging an error message if an error occurs during fetching
      console.error("Error fetching tasks:", error.message);
    }
  };

  // Function to handle editing a task
  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTaskId(taskToEdit);
  };

  // Function to handle deleting a task
  const handleDelete = async (taskId) => {
    try {
      // Making a DELETE request to the API to delete the task with the specified taskId
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        // Using the DELETE HTTP method
        method: "DELETE",
        // Attaching an authorization token from local storage
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        // Logging an error message if fetching fails
        throw new Error("Error deleting task");
      }
    } catch (error) {
      // Logging an error message if an error occurs during fetching
      console.error("Error deleting task:", error.message);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Render the component structure
  return (
    <Router>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link className="navbar-link" to="/">
              Task List
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/add">
              Add Task
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/add" element={<TaskForm fetchTasks={fetchTasks} />} />
        <Route
          path="/edit/:id"
          element={<EditTaskForm fetchTasks={fetchTasks} />}
        />
        <Route
          path="/"
          element={
            <TaskList
              tasks={tasks}
              fetchTasks={fetchTasks}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          }
        />
        <Route
          path="/:id"
          element={<TaskDetails tasks={tasks} fetchTasks={fetchTasks} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
