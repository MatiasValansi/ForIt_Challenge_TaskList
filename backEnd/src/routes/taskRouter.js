import { Router } from "express";
import { TaskController } from "../controller/task.controller.js";

export const taskRouter = Router();

taskRouter.get("/tasks", TaskController.taskAll);
taskRouter.post("/tasks", TaskController.taskCreateOne);
taskRouter.put("/tasks/:id", TaskController.taskUpdateOne);
taskRouter.delete("/tasks/:id", TaskController.taskDeleteOne);
//Extra
taskRouter.get("/tasks/:id", TaskController.taskValidation);
