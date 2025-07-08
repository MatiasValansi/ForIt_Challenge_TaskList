import { JsonHandler } from "../utils/JsonManager.js"

export const TaskRepository = {
    
    getAll: async () => await JsonHandler.read(),

    getById: async (id) => {
        const tasks = await JsonHandler.read()

        if (!tasks) return null

        const taskExists = tasks.find((eachTask) => eachTask.id == id)

        if (!taskExists) return null
        
        return taskExists
    }
}