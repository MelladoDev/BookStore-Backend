import request from "supertest";
import app from "../app.js";
import testPool from "./utils/setupTestDB.js";
import testToken from "./utils/testToken.js";

describe("TEST: Favoritos", () => {
  let createdFavoriteId;
  let testProductId;
  let testCategoryId;

  beforeAll(async () => {
    // Limpiar tablas para un entorno de prueba limpio
    await testPool.query("DELETE FROM productos_favoritos");
    await testPool.query("DELETE FROM productos");
    await testPool.query("DELETE FROM categorias");
    await testPool.query("DELETE FROM usuarios");

    // Insertar un usuario de prueba con id 1 (para coincidir con testToken)
    await testPool.query(
      `INSERT INTO usuarios (id_usuario, nombre, correo_electronico, direccion, telefono, "contraseña", fecha_registro)
       VALUES (1, 'Test User', 'testuser@example.com', 'Test Address', '123456789', 'dummyhash', CURRENT_DATE)`
    );

    // Insertar una categoría de prueba y guardar su id
    const categoryRes = await testPool.query(
      `INSERT INTO categorias (nombre, descripcion)
       VALUES ('Test Category', 'Categoria de prueba para favoritos')
       RETURNING id_categoria`
    );
    testCategoryId = categoryRes.rows[0].id_categoria;
    console.log("Test Category ID:", testCategoryId);

    // Verificar que la categoría se insertó correctamente
    const checkCategory = await testPool.query(
      "SELECT * FROM categorias WHERE id_categoria = $1",
      [testCategoryId]
    );
    console.log("Categoría insertada:", checkCategory.rows);

    // Insertar un producto de prueba usando el id_categoria obtenido y guardar su id
    const productRes = await testPool.query(
      `INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria, fecha_adicion)
       VALUES ('Producto Favorito', 'Producto de prueba para favoritos', 10000, 10, 'https://placehold.co/150x220/png', $1, CURRENT_DATE)
       RETURNING id_producto`,
      [testCategoryId]
    );
    testProductId = productRes.rows[0].id_producto;
    console.log("Test Product ID:", testProductId);

    // Verificar que el producto se insertó correctamente
    const checkProduct = await testPool.query(
      "SELECT * FROM productos WHERE id_producto = $1",
      [testProductId]
    );
    console.log("Producto insertado:", checkProduct.rows);
  });

  afterAll(async () => {
    await testPool.end();
  });

  test("✅ Debe agregar un producto a favoritos", async () => {
    const res = await request(app)
      .post("/scripta-backend/v1/favoritos")
      .set("Authorization", `Bearer ${testToken}`)
      .send({ id_producto: testProductId });
    
    console.log("Respuesta POST favoritos:", res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.id_producto).toBe(testProductId);
    expect(res.body).toHaveProperty("id_favorito");
    createdFavoriteId = res.body.id_favorito;
    console.log("ID Favorito creado:", createdFavoriteId);
  });

  test("✅ Debe obtener todos los favoritos", async () => {
    const res = await request(app)
      .get("/scripta-backend/v1/favoritos")
      .set("Authorization", `Bearer ${testToken}`);
    
    console.log("Respuesta GET favoritos:", res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.some(fav => fav.id_favorito === createdFavoriteId)).toBe(true);
  });

  test("✅ Debe eliminar un producto de favoritos", async () => {
    const res = await request(app)
      .delete(`/scripta-backend/v1/favoritos/${createdFavoriteId}`)
      .set("Authorization", `Bearer ${testToken}`);
    
    console.log("Respuesta DELETE favoritos:", res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Producto eliminado de favoritos");
  });
});
