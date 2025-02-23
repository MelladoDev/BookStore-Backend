import pool from "../DataBase/config.js";

export const getAllProducts = async () => {
  const result = await pool.query(`
        SELECT id_producto, nombre, descripcion, precio, stock, imagen, id_categoria 
        FROM productos 
        ORDER BY id_producto ASC
    `);
  return result.rows;
};

export const getProductById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM productos WHERE id_producto = $1",
    [id]
  );
  return result.rows[0];
};

export const createProduct = async (
  nombre,
  descripcion,
  precio,
  stock,
  imagen,
  id_categoria
) => {
  const result = await pool.query(
    "INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria, fecha_adicion) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE) RETURNING *",
    [nombre, descripcion, precio, stock, imagen, id_categoria]
  );
  return result.rows[0];
};

export const updateProduct = async (
  id,
  nombre,
  descripcion,
  precio,
  stock,
  imagen,
  id_categoria
) => {
  const result = await pool.query(
    "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4, imagen = $5, id_categoria = $6 WHERE id_producto = $7 RETURNING *",
    [nombre, descripcion, precio, stock, imagen, id_categoria, id]
  );
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM productos WHERE id_producto = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
