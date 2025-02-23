import pool from "../DataBase/config.js";

export const getAllCategories = async () => {
  const result = await pool.query(
    "SELECT * FROM categorias ORDER BY id_categoria ASC"
  );
  return result.rows;
};

export const getCategoryById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM categorias WHERE id_categoria = $1",
    [id]
  );
  return result.rows[0];
};

export const createCategory = async (nombre, descripcion) => {
  const result = await pool.query(
    "INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *",
    [nombre, descripcion]
  );
  return result.rows[0];
};

export const updateCategory = async (id, nombre, descripcion) => {
  const result = await pool.query(
    "UPDATE categorias SET nombre = $1, descripcion = $2 WHERE id_categoria = $3 RETURNING *",
    [nombre, descripcion, id]
  );
  return result.rows[0];
};

export const deleteCategory = async (id) => {
  const result = await pool.query(
    "DELETE FROM categorias WHERE id_categoria = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
