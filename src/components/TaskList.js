import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TaskList.css";

const TaskList = ({ tasks, fetchTasks, onDelete, onEdit }) => {
  // Get the navigate function from the react-router-dom
  const navigate = useNavigate();

  // Handle the edit button click
  const handleEdit = (taskId) => {
    // Call the onEdit function from the props
    onEdit(taskId);
    // Use navigate to redirect to the EditTaskForm with the task ID
    navigate(`/edit/${taskId}`);
  };

  // Handle the delete button click
  const handleDelete = async (taskId) => {
    // Call onDelete function to delete the task
    await onDelete(taskId);
    // Fetch tasks again to update the task list
    fetchTasks();
  };

  return (
    <div className="task-list-container">
      <h2 className="task-list-heading">Task List</h2>
      {tasks.map((task) => (
        <div className="task-card" key={task.id}>
          <p>{task.title}</p>
          <div className="button-group">
            <button
              className="delete-button"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
            <Link to={`/${task.id}`} className="details-link">
              <button className="details-button">Details</button>
            </Link>
            <button className="edit-button" onClick={() => handleEdit(task.id)}>
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
