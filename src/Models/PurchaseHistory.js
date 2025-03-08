import pool from "../DataBase/config.js";

class PurchaseHistory {
  // Obtener el historial de pedidos de un usuario (todos)
  static async getAll() {
    const query = `SELECT * FROM pedidos ORDER BY fecha_pedido DESC`;
    const result = await pool.query(query);
    return result.rows;
  }
  // Obtener el historial de pedidos de un usuario
  static async getAllByUser(userId) {
    const query = `SELECT * FROM pedidos WHERE id_usuario = $1 ORDER BY fecha_pedido DESC`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }


  // Obtener detalles de un pedido específico
  static async getDetailsByOrderId(orderId) {
    const query = `SELECT * FROM detalles_pedido WHERE id_pedido = $1`;
    const result = await pool.query(query, [orderId]);
    return result.rows;
  }

  // Crear un nuevo pedido con detalles
 static async createPurchase(userId, fecha_pedido, total, estado, detalles) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

   const stockResult = await client.query(
     "UPDATE productos SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING stock",
     [cantidad, productId]
      );

      if (stockResult.rowCount === 0) {
         throw new Error("Stock insuficiente.");
      }

    const pedidoQuery = `INSERT INTO pedidos (id_usuario, fecha_pedido, total, estado) 
                         VALUES ($1, $2, $3, $4) RETURNING id_pedido`;
    const pedidoResult = await client.query(pedidoQuery, [
      userId,
      fecha_pedido,
      total,
      estado,
    ]);
    const id_pedido = pedidoResult.rows[0].id_pedido;

    for (const detalle of detalles) {
      await client.query(
        `INSERT INTO detalles_pedido (id_pedido, id_producto, cantidad, precio_unitario) 
         VALUES ($1, $2, $3, $4)`,
        [
          id_pedido,
          detalle.id_producto,
          detalle.cantidad,
          detalle.precio_unitario,
        ]
      );
    }

    await client.query("COMMIT");
    return { id_pedido, message: "Pedido creado correctamente" };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}


};

export default PurchaseHistory;
