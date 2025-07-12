import app from "./app.js";
import { config } from "./config/config.js";

app.listen(config.PORT, () => {
	const message = `Server is running ==> http://${config.HOST}:${config.PORT} 🟢⭐`;
	console.log(message);
});