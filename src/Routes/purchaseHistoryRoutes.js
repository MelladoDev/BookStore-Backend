import express from "express";
import {
  getUserPurchaseHistory,
  getOrderDetails,
  createNewPurchase,
} from "../Controllers/purchaseHistoryController.js";

const router = express.Router();

// Obtener historial de compras de un usuario
router.get("/:id_usuario", getUserPurchaseHistory);

// Obtener detalles de un pedido
router.get("/details/:id_pedido", getOrderDetails);

// Crear un nuevo pedido con sus detalles
router.post("/", createNewPurchase);

export default router;
