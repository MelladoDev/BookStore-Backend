import request from "supertest";
import app from "../app.js";
import testPool from "./utils/setupTestDB.js";

describe("📌 TEST: Categorías", () => {
  beforeAll(async () => {
    // Primero eliminar los productos, luego las categorías para evitar violación de FK
    await testPool.query("DELETE FROM productos");
    await testPool.query("DELETE FROM categorias");
  });

  afterAll(async () => {
    await testPool.end();
  });

  test("✅ Debe crear una categoría nueva", async () => {
    const res = await request(app)
      .post("/scripta-backend/v1/categories")
      .send({
        nombre: "Terror",
        descripcion: "Libros de horror y suspenso"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe("Terror");
  });

  test("✅ Debe obtener todas las categorías", async () => {
    const res = await request(app).get("/scripta-backend/v1/categories");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
