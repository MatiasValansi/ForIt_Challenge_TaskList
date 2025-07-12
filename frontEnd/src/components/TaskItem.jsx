import React from 'react'
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {fetchTasks, fetchTaskById, deleteTask } from "../services/apiRouter.js";

const TaskItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
      try {
        const res = await fetchTasks();
        if (res.ok && res.payload) {
          navigate("/") 
        } else {
          alert("No se pudieron obtener las tareas.");
        }
      } catch (err) {
        console.error(err);
        alert("Error de conexión con la API");
      }
    };

  const deleteATask = async (taskToDelete) => {
              
    const isConfirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar la tarea "${taskToDelete.title}"?`
    );

    if (isConfirmed) {
      try {
        const res = await deleteTask(taskToDelete.id)

        if (res && !res.error) {
          alert("Tarea eliminada exitosamente.");
          await loadTasks(); // <--- Volver a cargar todas las tareas
          } else {
            alert(res.message || "Error al eliminar la tarea.");
            throw new Error(res.mensaje || "Error en la API");            
        }
        } catch (err) {
          console.error("Error al elimiar tarea:", err);
          alert("Error al guardar el cambio. Se revirtió el estado.");
        }
      }                
  }

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await fetchTaskById(id);
        if (res.ok) {
          setTask(res.payload.taskFoundById);
        } else {
          alert("Tarea no encontrada");
          navigate("/tasks");
        }
      } catch (err) {
        console.error(err);
        alert("Error al cargar la tarea");
        navigate("/tasks");
      } finally {
        setLoading(false);
      }
    };

    getTask();
  }, [id, navigate]);

  if (loading) return <p className="text-center text-light mt-5">Cargando tarea...</p>;
  if (!task) return null;

  return (
    <div className="min-vh-100 bg-black text-light py-4 px-3">
      <div className="container bg-dark p-4 rounded shadow">
        <h2 className="mb-4">🔍 Vista previa de tarea</h2>

        <div className="mb-3">
          <label className="form-label fw-bold">ID:</label>
          <div className="form-control bg-secondary text-light">{task.id}</div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Título:</label>
          <div className="form-control bg-dark text-light border-secondary">{task.title}</div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Descripción:</label>
          <div className="form-control bg-dark text-light border-secondary">{task.description}</div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Estado:</label>
          <div className="form-control bg-dark text-light border-secondary">
            {task.completed ? "✅ Completada" : "⏳ Pendiente"}
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold">Fecha de creación:</label>
          <div className="form-control bg-dark text-light border-secondary">{task.createdAt}</div>
        </div>

        <button
          onClick={() => navigate("/tasks")}
          className="btn btn-outline-light"
        >
          ← Volver al Menú
        </button>

        <Link
          to={`/editTask/${task.id}`}
          className="btn btn-sm btn-outline-light me-2"
        >
          ✍🏻 Editar
        </Link>

        <button
          onClick={() => deleteATask(task)}
          className="btn btn-sm btn-outline-danger"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
