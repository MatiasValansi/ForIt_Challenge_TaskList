import { TaskRepository } from "../repository/task.repository.js"
import { Task } from "../model/task.js"

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
    },

    serviceTaskCreation: async (taskToCreate) => {
        const dataTask = {
            ...taskToCreate,
            id: crypto.randomUUID().toString()
        }

        const modelTask = new Task(dataTask.id, dataTask.title, dataTask.description, dataTask.completed, dataTask.createdAt)

        const taskCreated  = TaskRepository.createOne(modelTask)

        return taskCreated        
    },

    serviceTaskDelete : (id) => {
        const taskDeleted = TaskRepository.deleteById(id)

        if(!taskDeleted) return null

        return taskDeleted
    },

    serviceTaskUpdate: async (id, taskToUpdated) => {
		const taskUpdated = await TaskRepository.updateById(
			id,
			taskToUpdated
		);

		if (!taskUpdated) return null;

		return taskUpdated;
	}
}