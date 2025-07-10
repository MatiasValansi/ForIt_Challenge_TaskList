import { useState } from "react"

export const TaskForm = ({createNewTask}) => {

    const [ newTaskName, setNewTaskName ] = useState()

    const handleSubmit = (task) => {
    task.preventDefault() //Para que no se recargue la página
    alert(`Se añadió la tarea: ${newTaskName} con exito`)
    //localStorage.setItem("tasks", newTaskName)
    
    createNewTask(newTaskName)
    setNewTaskName('')
  }

    return (
        <form onSubmit={handleSubmit}>
      <div>
        <input type="text" placeholder='Ingresá una nueva tarea' onChange={(taskText) => setNewTaskName(taskText.target.value)}/>
      
        <button>Guardar Tarea</button>

      </div>      
    </form>
    )
}