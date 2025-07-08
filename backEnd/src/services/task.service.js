import { TaskRepository } from "../repository/task.repository.js"

export const TaskService = {
    
    serviceAllTasks: async () => {
        const tasks = await TaskRepository.getAll()

        if(!tasks) return null

        return tasks
    },

    serviceTaskValidation: async (id) => {
        const idTask = await TaskRepository.getById(id)
        if (!idTask) return null

        return idTask
    }
}