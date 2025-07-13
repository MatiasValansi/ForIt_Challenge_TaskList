import { Task } from "../model/task.js";
import { TaskSupabaseRepository } from "../repository/task.supabase.repository.js";

export const TaskService = {
	serviceAllTasks: async () => {
		const tasks = await TaskSupabaseRepository.getAll();

		if (!tasks) return null;

		return tasks;
	},

	serviceTaskValidation: async (id) => {
		const idTask = await TaskSupabaseRepository.getById(id);

		if (!idTask) return null;

		return idTask;
	},

	serviceTaskCreation: async (taskToCreate) => {
		const dataTask = {
			...taskToCreate,
		};

		const modelTask = new Task(
			dataTask.title,
			dataTask.description,
			dataTask.completed,
			dataTask.createdAt,
		);

		const taskCreated = await TaskSupabaseRepository.createOne(modelTask);

		return taskCreated;
	},

	serviceTaskUpdate: async (id, taskToUpdated) => {
		const taskUpdated = await TaskSupabaseRepository.updateOneById(
			id,
			taskToUpdated,
		);

		if (!taskUpdated) return null;

		return taskUpdated;
	},

	serviceTaskDelete: async (id) => {
		const taskDeleted = await TaskSupabaseRepository.deleteOneById(id);

		if (!taskDeleted) return null;

		return taskDeleted;
	},
};
