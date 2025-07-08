import { TaskService } from "../services/task.service.js"

export const TaskController = {
    
    taskAll: async (req,res) => {
        const allTasks = await TaskService.serviceAllTasks()

        if (allTasks.length == 0) {
            res.status(404).json({
                payload: null,
                message: `Warning ⚠️ - No se encontraron tareas`,
                ok: false
            })
            return null
        } 

        res.status(200).json({
            message: "Success 🟢 - Tareas halladas correctamente",
            payload: allTasks,
            ok: true
        })


    },

    taskValidation : async (req,res) => {
        const {id} = req.params
        const taskFoundById = await TaskService.serviceTaskValidation(id)

        if (!taskFoundById) {
            res.status(404).json({
                payload: null,
                message: `No se encontró la tarea con ID: ${id}`,
                ok: false
            })
            return null
        } 

        res.status(200).json({
            message: "Success 🟢",
            payload: taskFoundById,
            ok: true
        })
    }
    
}
