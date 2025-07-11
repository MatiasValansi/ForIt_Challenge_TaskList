import { useEffect, useState } from "react";
import  TaskForm  from "./TaskForm.jsx";
import { fetchTasks, updateTask } from "../services/apiRouter.js";
import { Link } from "react-router-dom";


export const TaskList = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

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

    const toggleTask  = async (taskToToggle) => {
        setAllTasks(
            allTasks.map((eachTask) => (eachTask.id == taskToToggle.id) ? {...eachTask, completed: !eachTask.completed} : eachTask)
        )

        try {
            const updatedTask = {
                ...taskToToggle,
                completed: !taskToToggle.completed
            };

            const res = await updateTask(taskToToggle.id, updatedTask);

            if (!res.ok) {
                throw new Error(res.mensaje || "Error en la API");
            }

        } catch (err) {
            console.error("Error al actualizar tarea:", err);

            // Revertimos si falla
            setAllTasks(allTasks);
            alert("Error al guardar el cambio. Se revirtió el estado.");
            }
        }

        const taskTable = () => {
            let filtered = allTasks;

            if (filterStatus === "completed") {
              filtered = allTasks.filter(task => task.completed === true);
            } else if (filterStatus === "pending") {
              filtered = allTasks.filter(task => task.completed === false);
            }

            return filtered.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.completed ? "✅" : "❌"}</td>
                <td>{task.description}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                  />
                </td>
                <td>
                  <Link to={`/tarea/${task.id}`}>🔍 Ver</Link>
                </td>
              </tr>
            ));
          };

    // Carga inicial de tareas
    useEffect(() => {
      loadTasks();
    }, []);
  

  return (
    <div>
      <TaskForm/>
      
      <table>
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={() => setFilterStatus("all")}>📋 Todas</button>
          <button onClick={() => setFilterStatus("completed")}>✅ Completadas</button>
          <button onClick={() => setFilterStatus("pending")}>⏳ Pendientes</button>
        </div>

        <thead>
          <tr>
            <th>Título</th>
            <th>Completada</th>
            <th>Descripción</th>
            <th>Toggle</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {taskTable()}
        </tbody>
      </table>
    </div>
  );
};

