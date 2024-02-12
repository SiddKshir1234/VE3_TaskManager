import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TaskForm.css";

const EditTaskForm = ({ fetchTasks }) => {
  // Get the task ID from the URL parameters
  const { id } = useParams();

  // Hook for navigating within the Router
  const navigate = useNavigate();

  // State to manage form data: title and description
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Fetch task details based on the ID when the component mounts
  useEffect(() => {
    // Fetch the task details based on the ID
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`);
        if (!response.ok) {
          // Logging an error message if fetching fails
          throw new Error("Error fetching task details");
        }
        const taskDetails = await response.json();
        setFormData(taskDetails);
      } catch (error) {
        console.error("Error fetching task details:", error.message);
      }
    };

    fetchTaskDetails();
  }, [id]);

  // Update form data as user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the task
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Checking if the response is successful
      if (!response.ok) {
        // Logging an error message if fetching fails
        throw new Error("Error updating task");
      }

      // Clear the form data
      setFormData({
        title: "",
        description: "",
      });

      // Redirect to the task list after updating
      navigate("/");
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  return (
    <div className="task-form-card">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          className="form-input"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
        ></textarea>
        <br />
        <button type="submit" className="submit-button">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskForm;
