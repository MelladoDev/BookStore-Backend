import {
  getPurchaseHistoryByUser,
  getPurchaseDetailsByOrderId,
  createPurchase,
} from "../Models/PurchaseHistory.js";

export const getUserPurchaseHistory = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const history = await getPurchaseHistoryByUser(id_usuario);
    res.json(history);
  } catch (error) {
    console.error("Error al obtener historial de compras:", error);
    res
      .status(500)
      .json({ error: "No se pudo obtener el historial de compras" });
  }
};

export const getOrderDetails = async (req, res) => {
  const { id_pedido } = req.params;
  try {
    const details = await getPurchaseDetailsByOrderId(id_pedido);
    res.json(details);
  } catch (error) {
    console.error("Error al obtener detalles del pedido:", error);
    res
      .status(500)
      .json({ error: "No se pudo obtener los detalles del pedido" });
  }
};

export const createNewPurchase = async (req, res) => {
  const { id_usuario, fecha_pedido, total, estado, detalles } = req.body;
  try {
    const result = await createPurchase(
      id_usuario,
      fecha_pedido,
      total,
      estado,
      detalles
    );
    res.status(201).json(result);
  } catch (error) {
    console.error("Error al registrar la compra:", error);
    res.status(500).json({ error: "No se pudo registrar la compra" });
  }
};
