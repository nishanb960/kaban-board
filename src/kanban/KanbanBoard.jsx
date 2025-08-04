import React, { useState } from "react";
import "./KanbanBoard.css";

const initialData = [
  {
    id: 1,
    title: "Design UI",
    description: "Create wireframes for the new dashboard.",
    status: "To Do",
  },
  {
    id: 2,
    title: "Set up backend",
    description: "Initialize Express server and MongoDB.",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Write documentation",
    description: "Document API endpoints.",
    status: "Done",
  },
];

const columns = ["To Do", "In Progress", "Done"];

function KanbanBoard() {
  const [tasks, setTasks] = useState(initialData);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "To Do" });

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    setTasks([
      ...tasks,
      { ...newTask, id: Date.now() },
    ]);
    setNewTask({ title: "", description: "", status: "To Do" });
  };

  const moveTask = (id, direction) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const currentIndex = columns.indexOf(task.status);
          const newIndex = currentIndex + direction;
          if (newIndex >= 0 && newIndex < columns.length) {
            return { ...task, status: columns[newIndex] };
          }
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="kanban-container">
      <h2>Kanban Task Board</h2>
      <form className="kanban-form" onSubmit={addTask}>
        <input
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task title"
          required
        />
        <input
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="kanban-board">
        {columns.map((col) => (
          <div key={col} className="kanban-column">
            <h3>{col}</h3>
            {tasks.filter((task) => task.status === col).map((task) => (
              <div key={task.id} className="kanban-task">
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <div className="kanban-actions">
                  <button onClick={() => moveTask(task.id, -1)} disabled={col === columns[0]}>←</button>
                  <button onClick={() => moveTask(task.id, 1)} disabled={col === columns[columns.length - 1]}>→</button>
                  <button onClick={() => deleteTask(task.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
