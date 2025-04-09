import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Obtener tareas desde el backend
  const getTodos = async () => {
    const url = "https://playground.4geeks.com/todo/users/jaz08";
    try {
      const respuesta = await fetch(url);
      const data = await respuesta.json();
      console.log("Tareas desde backend:", data.todos);
      if (data.todos) {
        setTasks(data.todos);
      } else {
        console.log("No se encontraron tareas.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const addTask = async (tecla) => {
    if (tecla.key === "Enter" && newTask.trim()) {
      try {
        const url = "https://playground.4geeks.com/todo/todos/jaz08";
        const respuesta = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ label: newTask.trim() })
        });

        const data = await respuesta.json();
        console.log("Tarea creada:", data);
        setNewTask("");  // Limpiar el campo de texto

        if (respuesta.ok) {
          // Actualizar tareas después de agregar una nueva
          await getTodos();
        }
      } catch (error) {
        console.log("Error al agregar tarea:", error);
      }
    }
  };

  
  const removeTask = async (id) => {
    try {
      const url = `https://playground.4geeks.com/todo/todos/${id}`;
      const respuesta = await fetch(url, {
        method: "DELETE"
      });

      if (respuesta.ok) {
        console.log(`Tarea con ID ${id} eliminada exitosamente`);
        await getTodos(); // Actualizar tareas después de eliminar una
      } else {
        console.log("Error al eliminar tarea:", respuesta.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="container mt-5 p-4 bg-white shadow-lg rounded-lg w-25">
      <h1 className="text-center text-secondary mb-4">todos</h1>
      <input
        type="text"
        className="form-control"
        placeholder="What needs to be done?"
        aria-label="What needs to be done?"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={addTask}
      />

      {tasks.length === 0 ? (
        <p className="text-center mt-3">No hay tareas, agrega una</p>
      ) : (
        <ul className="list-group mt-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center position-relative"
            >
              <span>{task.label}</span>
              <button
                className="btn btn-outline-black btn-sm position-absolute end-0 me-2"
                onClick={() => removeTask(task.id)}
                style={{ display: "none" }} // Mostrar solo cuando se pasa el cursor
              >
                X {/* Simple "X" for remove task */}
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="text-center mt-3">Tareas pendientes: {tasks.length}</p>

      <style>
        {`.list-group-item:hover button {display: inline-block !important;}`}
      </style>
    </div>
  );
};

export default TodoList;

