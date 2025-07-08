import { Router } from "express";
import { TaskController } from "../controller/task.controller.js";


export const taskRouter = Router()

taskRouter.get("/tasks", TaskController.taskAll)
taskRouter.post("/tasks", (req, res) => {})
taskRouter.put("/tasks/:id", (req, res) => {})
taskRouter.delete("/tasks/:id", (req, res) => {})
//Extra
taskRouter.get("/tasks/:id", TaskController.taskValidation)
