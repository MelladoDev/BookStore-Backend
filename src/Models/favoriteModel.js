import pool from '../DataBase/config.js';

class FavoritosModel {
  static async getAllByUser(userId) {
    const result = await pool.query(
      `SELECT f.id_favorito, f.id_producto, p.nombre, p.descripcion, p.precio, p.imagen, f.fecha_agregado
       FROM productos_favoritos f
       JOIN productos p ON f.id_producto = p.id_producto
       WHERE f.id_usuario = $1`,
      [userId]
    );
    return result.rows;
  }

  static async add(userId, productId) {
    const result = await pool.query(
      `INSERT INTO productos_favoritos (id_usuario, id_producto, fecha_agregado)
       VALUES ($1, $2, CURRENT_DATE) RETURNING *`,
      [userId, productId]
    );
    return result.rows[0];
  }

  static async remove(userId, favoriteId) {
    const result = await pool.query(
      `DELETE FROM productos_favoritos WHERE id_favorito = $1 AND id_usuario = $2 RETURNING *`,
      [favoriteId, userId]
    );
    return result.rows[0];
  }
}

export default FavoritosModel;
