import express from "express";
import { config } from "./config/config.js";
import { taskRouter } from "./routes/taskRouter.js";

const app = express();

app.use(express.json());

app.use("/api", taskRouter);

app.listen(config.PORT, () => {
	const message = `Server is running ==> http://${config.HOST}:${config.PORT} 🟢⭐`;
	console.log(message);
});
