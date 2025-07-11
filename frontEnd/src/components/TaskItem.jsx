import React from 'react';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTaskById, updateTask } from "../services/apiRouter.js";

export const TaskItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await fetchTaskById(id);
        if (res.ok) {
          setTask(res.payload.taskFoundById);
        } else {
          alert("Tarea no encontrada");
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        alert("Error al cargar la tarea");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    getTask();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await updateTask(id, task);

      if (res.ok) {
        alert("Cambios guardados correctamente ✅");
        navigate("/");
      } else {
        alert(res.mensaje || "Error al guardar los cambios");
      }
    } catch (err) {
      console.error(err);
      alert("Error al guardar los cambios");
    }
  };

  if (loading) return <p>Cargando tarea...</p>;
  if (!task) return null;

  return (
    <div>
      <h2>Editar tarea 📝</h2>

      <p><strong>ID:</strong> {task.id}</p>

      <div>
        <label>Título:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
          />
          Completada
        </label>
      </div>

      <div>
        <label>Fecha de creación:</label>
        <input
          type="text"
          name="createdAt"
          value={task.createdAt}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSave}>💾 Guardar Cambios</button>
      <button onClick={() => navigate("/")}>← Volver</button>
    </div>
  );
};

export default TaskItem