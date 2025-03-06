import PurchaseHistory from "../Models/PurchaseHistory.js";

class PurchaseHistoryController {
  // Obtiene todo el historial (puede servir para admin o para análisis)
  static async PurchgetAll(req, res) {
    try {
      const usuarios = await PurchaseHistory.getAll();
      res.json(usuarios);
    } catch (error) {
      console.error("Error al obtener todos los historiales:", error);
      res.status(500).json({ error: "Error al obtener usuarios" });
    }
  }

  // Obtiene el historial de compras de un usuario específico
  static async getUserPurchaseHistory(req, res) {
    const { id_usuario } = req.params;
    try {
      const history = await PurchaseHistory.getPurchaseHistoryByUser(id_usuario);
      res.json(history);
    } catch (error) {
      console.error("Error al obtener historial de compras:", error);
      res.status(500).json({ error: "No se pudo obtener el historial de compras" });
    }
  }

  // Obtiene los detalles de un pedido específico
  static async getOrderDetails(req, res) {
    const { id_pedido } = req.params;
    try {
      const details = await PurchaseHistory.getPurchaseDetailsByOrderId(id_pedido);
      res.json(details);
    } catch (error) {
      console.error("Error al obtener detalles del pedido:", error);
      res.status(500).json({ error: "No se pudo obtener los detalles del pedido" });
    }
  }

  // Crea una nueva compra
  static async createNewPurchase(req, res) {
    const { id_usuario, fecha_pedido, total, estado, detalles } = req.body;
    try {
      const result = await PurchaseHistory.createPurchase(id_usuario, fecha_pedido, total, estado, detalles);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error al registrar la compra:", error);
      res.status(500).json({ error: "No se pudo registrar la compra" });
    }
  }
}

export default PurchaseHistoryController;
