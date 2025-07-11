import express from "express";
import { config } from "./config/config.js";
import { taskRouter } from "./routes/taskRouter.js";
import cors from 'cors';


const app = express();

app.use(cors()); // Con esto el navegador no bloqueará mi conexión entre el Back y el Front

app.use(express.json());

app.use("/api", taskRouter);

app.get("/", (req, res) => {
  res.redirect("/api/tasks");
});

app.listen(config.PORT, () => {
	const message = `Server is running ==> http://${config.HOST}:${config.PORT} 🟢⭐`;
	console.log(message);
});
