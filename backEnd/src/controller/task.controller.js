import { TaskService } from "../services/task.service.js";

export const TaskController = {
	taskAll: async (_req, res) => {
		try {
			const allTasks = await TaskService.serviceAllTasks();

			if (allTasks.length === 0) {
				return res.status(404).json({
					payload: null,
					message: `Warning ⚠️ - No se encontraron tareas`,
					ok: false,
				});
			}

			res.status(200).json({
				message: "Success 🟢 - Tareas halladas correctamente",
				payload: allTasks,
				ok: true,
			});
		} catch (error) {
			console.error("Error al obtener las tareas:", error);
			res.status(500).json({
				message:
					"Uups! Algo salió mal ... 🔴 ==> No se pudo hallar las táreas ❌",
				payload: null,
				ok: false,
			});
		}
	},

	taskValidation: async (req, res) => {
		try {
			const { id } = req.params;
			const taskFoundById = await TaskService.serviceTaskValidation(id);

			if (taskFoundById.length === 0) {
				return res.status(404).json({
					payload: null,
					message: `No se encontró la tarea con ID: ${id}`,
					ok: false,
				});
			}

			res.status(200).json({
				message: "Success 🟢 - La tarea fue hallada correctamente",
				payload: { taskFoundById },
				ok: true,
			});
		} catch (error) {
			console.error(
				`Error al validar la tarea con ID: ${req.params.id}`,
				error,
			);
			res.status(500).json({
				message: `Uups! Algo salió mal ... 🔴 ==> No se pudo halar la tarea ❌`,
				payload: null,
				ok: false,
			});
		}
	},

	taskCreateOne: async (req, res) => {
		const { task } = req.body;

		try {
			const taskResponse = await TaskService.serviceTaskCreation(task);
			res.status(200).json({
				message: "Success 🟢 ==> Tarea creada con exito",
				payload: { taskResponse },
				ok: true,
			});
			return;
		} catch (e) {
			res.status(404).json({
				error: e.message,
				message: "Uups! Algo salió mal ... 🔴 ==> No se pudo crear la tarea ❌",
				ok: false,
			});
			return;
		}
	},

	taskUpdateOne: async (req, res) => {
		const { id } = req.params;
		const { task } = req.body;

		try {
			const taskUpdated = await TaskService.serviceTaskUpdate(id, task);

			res.status(200).json({
				message: `Success 🟢 ==> La tarea ${taskUpdated.title} fue modificada con exito 💱`,
				payload: { taskUpdated },
				ok: true,
			});
			return;
		} catch (e) {
			res.status(404).json({
				error: e.message,
				message:
					"Uups! Algo salió mal ... 🔴 ==> No se pudo actualizar la tarea ❌",
				ok: false,
			});
			return;
		}
	},

	taskDeleteOne: async (req, res) => {
		const { id } = req.params;

		try {
			const taskDeleted = await TaskService.serviceTaskDelete(id);
			res.status(200).json({
				message: `Success 🟢 ==> La tarea ${taskDeleted.title} fue eliminada con exito 🗑️`,
				payload: { taskDeleted },
				ok: true,
			});
			return;
		} catch (e) {
			res.status(404).json({
				error: e.message,
				message:
					"Uups! Algo salió mal ... 🔴 ==> No se pudo eliminar la tarea ❌",
				ok: false,
			});
			return;
		}
	},
};
