// TaskDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./TaskDetails.css";

const TaskDetails = ({ fetchTasks }) => {
  // Extracting the task ID from the route parameters
  const { id } = useParams();

  // State to hold the task details
  const [task, setTask] = useState(null);

  // Fetching task details based on the ID when the component mounts
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        // Fetching task details from the API
        const response = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await response.json();

        // Checking if the response is successful
        if (response.ok) {
          // Updating the state with task details
          setTask(data);
        } else {
          // Logging an error message if fetching fails
          console.error(data.error || "Failed to fetch task details");
        }
      } catch (error) {
        // Logging an error message if an error occurs during fetching
        console.error("Error fetching task details:", error.message);
      }
    };

    fetchTaskDetails();
  }, [id]);

  // If task details are not yet available, display a loading message
  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-card">
      <h2>Task Details</h2>
      <div className="field">
        <p className="label">Task ID:</p>
        <p className="value">{task.id}</p>
      </div>
      <div className="field">
        <p className="label">Title:</p>
        <p className="value">{task.title}</p>
      </div>
      <div className="field">
        <p className="label">Description:</p>
        <p className="value">{task.description}</p>
      </div>
      <Link to="/" onClick={() => fetchTasks()}>
        Back to Task List
      </Link>
    </div>
  );
};

export default TaskDetails;
