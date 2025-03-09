import pool from "../DataBase/config.js";

export const getAllProducts = async () => {
  const result = await pool.query(`
        SELECT id_producto, nombre, autor, descripcion, precio, stock, imagen, id_categoria 
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
  autor,
  descripcion,
  precio,
  stock,
  imagen,
  id_categoria
) => {
  const result = await pool.query(
    "INSERT INTO productos (nombre, autor, descripcion, precio, stock, imagen, id_categoria, fecha_adicion) VALUES ($1, $2, $3, $4, $5, $6, $7 CURRENT_DATE) RETURNING *",
    [nombre, autor, descripcion, precio, stock, imagen, id_categoria]
  );
  return result.rows[0];
};

export const updateProduct = async (
  id,
  nombre,
  autor,
  descripcion,
  precio,
  stock,
  imagen,
  id_categoria
) => {
  const result = await pool.query(
    "UPDATE productos SET nombre = $1, autor = $2, descripcion = $3, precio = $4, stock = $5, imagen = $6, id_categoria = $7 WHERE id_producto = $8 RETURNING *",
    [nombre, autor, descripcion, precio, stock, imagen, id_categoria, id]
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
