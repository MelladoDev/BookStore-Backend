import request from "supertest";
import app from "../app.js";
import testPool from "./utils/setupTestDB.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();

describe("TEST: Autenticacion", () => {
  beforeAll(async () => {
    // Limpiar la tabla de usuarios para un entorno de pruebas limpio
    await testPool.query("DELETE FROM usuarios");

    // Insertar un usuario de prueba con id_usuario = 1
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("loginpassword", saltRounds);
    await testPool.query(
      `INSERT INTO usuarios (id_usuario, nombre, correo_electronico, direccion, telefono, "contraseña", fecha_registro)
       VALUES (1, 'Login User', 'loginuser@example.com', 'Test Address', '111111111', $1, CURRENT_DATE)`,
      [hashedPassword]
    );
  });

  afterAll(async () => {
    await testPool.end();
  });

  test("✅ Debe iniciar sesión y recibir un token", async () => {
    const res = await request(app)
      .post("/scripta-backend/v1/auth/login")
      .send({
        correo_electronico: "loginuser@example.com",
        contraseña: "loginpassword"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(typeof res.body.token).toBe("string");
  });
});
