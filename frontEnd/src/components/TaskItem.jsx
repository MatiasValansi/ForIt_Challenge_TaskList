import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTaskById } from "../services/apiRouter";

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

  if (loading) return <p>Cargando tarea...</p>;
  if (!task) return null;

  return (
    <div>
      <h2>Detalle de tarea 📝</h2>
      <p><strong>ID:</strong> {task.id}</p>
      <p><strong>Título:</strong> {task.title}</p>
      <p><strong>Descripción:</strong> {task.description}</p>
      <p><strong>Estado:</strong> {task.completed ? "✅ Completada" : "⏳ Pendiente"}</p>
      <p><strong>Creada el:</strong> {task.createdAt}</p>

      <button onClick={() => navigate("/")}>← Volver</button>
    </div>
  );
};

export default TaskItem