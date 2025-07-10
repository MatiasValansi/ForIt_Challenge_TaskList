import { useState } from "react";
import  TaskForm  from "./TaskForm.jsx";
import { fetchTasks } from "../services/apiRouter.js";

export const TaskList = () => {

    const [allTasks, setAllTasks] = useState([
                
    ])

    const createNewTask = async (taskName) => {
        //Una vez conectado con nuestra API mediante el Fetch, debo añadir la validación de que el ID no exista
        //setAllTasks([...allTasks, {name:taskName, completada:false}])
        const tasks = await fetchTasks()
        tasks.array.forEach(eachTask => {
            setAllTasks([...allTasks, {eachTask}])
        });
    }

    return (
        <div>
            <TaskForm createNewTask={createNewTask}/>
            <table>
                <thead>
                    <tr>
                        <th>Tareas</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allTasks.map(eachTask => (
                            <tr key={eachTask.name}>
                                {/* Una vez conectada con la API, el key deberá ser el ID de Task */}
                                <td>
                                    {eachTask.name}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}