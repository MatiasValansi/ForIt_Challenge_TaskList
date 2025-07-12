import request from "supertest";
import app from "../app.js"
import dotenv from "dotenv"

dotenv.config()


describe("Pruebas Unitarias en mi API de Tareas", () => {
  
   test("POST /api/tasks -> Crear una tarea", async () => {
    const taskToCreate = {
      task: {
        title: "TEST - Prueba Unitaria",
        description: "Intentando hacer un POST con Jest",
        completed: false,
        createdAt: "11/07/25025"
      }
    };

    const response = await request(app)
      .post("/api/tasks")
      .send(taskToCreate)
      .set("Content-Type", "application/json");

    console.log("Respuesta POST:", response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.payload?.taskResponse).toBeDefined();

    const task = response.body.payload.taskResponse;

    expect(task.title).toBe(taskToCreate.task.title);
    expect(task.description).toBe(taskToCreate.task.description);
  });

  let taskId;

  beforeAll(async () => {
    // Creo una tarea temporal que luego se eliminara en caso de que se concrete la prueba unitaria
    const newTask = {
      task: {
        title: "TEST - Tarea temporal para probar Delete",
        description: "Esta tarea será eliminada en el test",
        completed: false,
        createdAt: new Date().toISOString()
      }
    };

    const response = await request(app)
      .post("/api/tasks")
      .send(newTask)
      .set("Content-Type", "application/json");

    
    taskId = response.body.payload?.taskResponse?.id;
    expect(taskId).toBeDefined();
  });

  test("DELETE /api/tasks/:id -> Eliminar una tarea", async () => {
    const response = await request(app).delete(`/api/tasks/${taskId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.payload.taskDeleted.id).toBe(taskId);
    expect(response.body.message).toMatch(/eliminada con exito/i);
  });
});