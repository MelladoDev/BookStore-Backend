import request from "supertest";
import app from "../app.js";
import testPool from "./utils/setupTestDB.js";
import testToken from "./utils/testToken.js";

describe("TEST: Productos", () => {
  let testCategoryId; // Para almacenar el id de la categoría de prueba
  let createdProduct;

  beforeAll(async () => {
    // Limpiar las tablas primero para evitar conflictos de FK
    await testPool.query("DELETE FROM productos");
    await testPool.query("DELETE FROM categorias");

    // Insertar una categoría de prueba y obtener su id
    const categoryResult = await testPool.query(
      "INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING id_categoria",
      ["Test Category", "Categoria para pruebas"]
    );
    testCategoryId = categoryResult.rows[0].id_categoria;
  });

  afterAll(async () => {
    await testPool.end();
  });

  test("✅ Debe crear un producto nuevo", async () => {
    const res = await request(app)
      .post("/scripta-backend/v1/products")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        nombre: "Producto Test",
        descripcion: "Descripcion de producto test",
        precio: 10000,
        stock: 10,
        imagen: "https://placehold.co/150x220/png",
        id_categoria: testCategoryId // Utilizamos la categoría de prueba
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe("Producto Test");
    createdProduct = res.body;
  });

  test("✅ Debe obtener todos los productos", async () => {
    const res = await request(app).get("/scripta-backend/v1/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test("✅ Debe obtener un producto por ID", async () => {
    const res = await request(app).get(
      `/scripta-backend/v1/products/${createdProduct.id_producto}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.id_producto).toBe(createdProduct.id_producto);
  });

  test("✅ Debe actualizar un producto", async () => {
    const res = await request(app)
      .put(`/scripta-backend/v1/products/${createdProduct.id_producto}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        nombre: "Producto Test Actualizado",
        descripcion: "Descripcion actualizada",
        precio: 12000,
        stock: 5,
        imagen: "https://placehold.co/150x220/png",
        id_categoria: testCategoryId
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe("Producto Test Actualizado");
  });

  test("✅ Debe eliminar un producto", async () => {
    const res = await request(app)
      .delete(`/scripta-backend/v1/products/${createdProduct.id_producto}`)
      .set("Authorization", `Bearer ${testToken}`);
    expect(res.statusCode).toBe(200);
  });
});
