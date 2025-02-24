import request from "supertest";
import app from "../app.js";
import testPool from "./utils/setupTestDB.js";
import testToken from "./utils/testToken.js";

describe("TEST: Usuarios", () => {
  let createdUser;

  beforeAll(async () => {
    // Limpiar la tabla de usuarios antes de las pruebas
    await testPool.query("DELETE FROM usuarios");
  });

  afterAll(async () => {
    await testPool.end();
  });

  test("✅ Debe crear un usuario nuevo", async () => {
    const res = await request(app)
      .post("/scripta-backend/v1/users")
      .send({
        nombre: "Usuario Test",
        correo_electronico: "testuser@example.com",
        direccion: "Direccion de prueba",
        telefono: "123456789",
        contraseña: "testpassword"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.correo_electronico).toBe("testuser@example.com");
    createdUser = res.body;
  });

  test("✅ Debe obtener todos los usuarios", async () => {
    const res = await request(app)
      .get("/scripta-backend/v1/users")
      .set("Authorization", `Bearer ${testToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test("✅ Debe obtener un usuario por ID", async () => {
    const res = await request(app)
      .get(`/scripta-backend/v1/users/${createdUser.id_usuario}`)
      .set("Authorization", `Bearer ${testToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id_usuario).toBe(createdUser.id_usuario);
  });

  // Opcional: tests para actualizar y eliminar el usuario
});



