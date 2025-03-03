import express from "express";
import PurchaseHistoryController from "../Controllers/purchaseHistoryController.js";

const router = express.Router();

router.get("/:id_usuario", PurchaseHistoryController.getUserPurchaseHistory);
router.get("/details/:id_pedido", PurchaseHistoryController.getOrderDetails);
router.post("/", PurchaseHistoryController.createNewPurchase);

export default router;
