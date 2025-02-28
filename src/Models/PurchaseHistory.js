import pool from "../DataBase/config.js";

// Obtener historial de compras de un usuario
export const getPurchaseHistoryByUser = async (userId) => {
  const query = `SELECT * FROM pedidos WHERE id_usuario = $1 ORDER BY fecha_pedido DESC`;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Obtener detalles de un pedido específico
export const getPurchaseDetailsByOrderId = async (orderId) => {
  const query = `SELECT * FROM detalles_pedido WHERE id_pedido = $1`;
  const result = await pool.query(query, [orderId]);
  return result.rows;
};

// Crear un nuevo pedido con detalles
export const createPurchase = async (
  userId,
  fecha_pedido,
  total,
  estado,
  detalles
) => {
  try {
    await pool.query("BEGIN");

    const pedidoQuery = `INSERT INTO pedidos (id_usuario, fecha_pedido, total, estado) 
                         VALUES ($1, $2, $3, $4) RETURNING id_pedido`;
    const pedidoResult = await pool.query(pedidoQuery, [
      userId,
      fecha_pedido,
      total,
      estado,
    ]);
    const id_pedido = pedidoResult.rows[0].id_pedido;

    for (const detalle of detalles) {
      await pool.query(
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

    await pool.query("COMMIT");
    return { id_pedido, message: "Pedido creado correctamente" };
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};
