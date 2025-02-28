import pool from "../DataBase/config.js";

export const getAdminInfo = async () => {
  const query = `SELECT usuario FROM administrador LIMIT 1`;
  const result = await pool.query(query);
  return result.rows[0];
};
