import express from "express"
import { config } from "./config/config.js"
import { statusRouter } from "./routes/statusRouter.js"
import { taskRouter } from "./routes/taskRouter.js"

const app = express()

app.use(express.json());

app.use("/api", taskRouter)
app.use("/api", statusRouter)

app.listen( config.PORT, () => {
    const message = `Server is running ==> http://${config.HOST}:${config.PORT} 🟢⭐`
    console.log(message);    
    }    
)