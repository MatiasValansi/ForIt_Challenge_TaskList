import express from "express";
import { config } from "./config/config.js";
import { taskRouter } from "./routes/taskRouter.js";
import cors from 'cors';
import { TaskSupabaseRepository } from "./repository/task.supabase.repository.js";


const app = express();

app.use(cors()); // Con esto el navegador no bloqueará mi conexión entre el Back y el Front

app.use(express.json());

app.use("/api", taskRouter);

app.get("/", async (req, res) => {
  res.redirect("/api/tasks");
});


export default app