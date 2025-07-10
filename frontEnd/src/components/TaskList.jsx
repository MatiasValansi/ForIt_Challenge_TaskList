import { useEffect, useState } from "react";
import  TaskForm  from "./TaskForm.jsx";
import { fetchTasks } from "../services/apiRouter.js";

export const TaskList = () => {
  const [allTasks, setAllTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await fetchTasks();
      if (res.ok && res.payload) {
        setAllTasks(res.payload); 
      } else {
        alert("No se pudieron obtener las tareas.");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión con la API");
    }
  };

  // Carga inicial de tareas
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <TaskForm/>
      
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Completada</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
            {allTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.completed ? "✅" : "❌"}</td>
              <td>{task.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

