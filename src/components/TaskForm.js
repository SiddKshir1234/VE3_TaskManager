import React, { useState, useEffect } from "react";
import "./TaskForm.css";

const TaskForm = ({ fetchTasks, taskToEdit, setTaskToEdit }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Effect to update form data when taskToEdit changes
  useEffect(() => {
    // If taskToEdit is provided, populate form data with task details
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
      });
    }
  }, [taskToEdit]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine the API endpoint and HTTP method based on whether it's an edit or add operation
    const apiUrl = taskToEdit
      ? `http://localhost:5000/tasks/${taskToEdit.id}`
      : "http://localhost:5000/tasks";

    const method = taskToEdit ? "PUT" : "POST";

    try {
      // Make a request to the API
      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Error submitting task");
      }

      // Clear the form data
      setFormData({
        title: "",
        description: "",
      });

      // If updating, reset the taskToEdit state
      if (taskToEdit) {
        setTaskToEdit(null);
      }

      // Update the local state by fetching tasks again
      fetchTasks();
    } catch (error) {
      console.error("Error submitting task:", error.message);
    }
  };

  return (
    <div className="task-form-card">
      <h2>{taskToEdit ? "Edit Task" : "Add Task"}</h2>
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
          {taskToEdit ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
