import cors from "cors";
import express from "express";
import { taskRouter } from "./routes/taskRouter.js";

const app = express();

app.use(cors()); // Con esto el navegador no bloqueará mi conexión entre el Back y el Front

app.use(express.json());

app.use("/api", taskRouter);

app.get("/", async (_req, res) => {
	res.redirect("/api/tasks");
});

export default app;
