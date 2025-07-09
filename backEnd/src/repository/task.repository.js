import { JsonHandler } from "../utils/JsonManager.js"

export const TaskRepository = {
    
    getAll: async () => await JsonHandler.read(),

    getById: async (id) => {
        const tasks = await JsonHandler.read()

        if (!tasks) return null

        const taskExists = tasks.find((eachTask) => eachTask.id == id)

        if (!taskExists) return null
        
        return taskExists
    },

    createOne: async (taskToCreate) => {
		const tasks = await JsonHandler.read();
		if (!tasks) return null;

		const taskExists = tasks.find((taskBook) => taskBook.id == taskToCreate.id);
		/*
        Valido que NO exista una tarea con el mismo ID. Si NO existe una tarea con el mismo ID, será añadido. De esta manera, vamos a evitar tener 2 tareas con el mismo ID.
        */
		if (taskExists) return null;

		tasks.push(taskToCreate);

		try {
			await JsonHandler.write(tasks);
		} catch (error) {
			console.error({ message: error.message });
			return;
		}

		return taskToCreate;
	},

    deleteById: async (id) => {
		const tasks = await JsonHandler.read();

		if (!tasks) return null;

		const taskToDeleteExists = tasks.find((eachTask) => eachTask.id == id);

		if (!taskToDeleteExists) return null;

		//Tendrá la colección de Libros SIN el libro eliminado.
		const tasksToSaveAgain = tasks.filter((taskBook) => taskBook.id != id);

		try {
			await JsonHandler.write(tasksToSaveAgain);
			return taskToDeleteExists;
		} catch (error) {
			console.error(`No se ha podido eliminar ---> ${error.message}`);
			return null;
		}
	},

    updateById: async (id, taskToUpdated) => {
		const tasks = await JsonHandler.read();

		if (!tasks) return null;

		const taskToUpdateExists = tasks.find((eachTask) => eachTask.id == id);

		if (!taskToUpdateExists) return null;

		//Tendrá la colección de tareas sin la tarea a actualizar
		const tasksToSaveAgain = tasks.filter((eachTask) => eachTask.id != id);

		const taskUpdated = {
			...taskToUpdateExists,
			title: taskToUpdated.title,
			description: taskToUpdated.description,
			completed: taskToUpdated.completed,
            createdAt: taskToUpdated.createdAt
		};

		tasksToSaveAgain.push(taskUpdated);

		try {
			await JsonHandler.write(tasksToSaveAgain);
			return taskUpdated;
		} catch (error) {
			console.error(`No se ha podido actualizar ---> ${error.message}`);
			return null;
		}
	}
}