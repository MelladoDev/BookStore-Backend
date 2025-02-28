import express from "express";
import { getAdminData } from "../Controllers/adminController.js";
import { verifyAdmin } from "../Middlewares/adminMiddleware.js"; 

const router = express.Router();

// Obtener la información del admin (protegido)
router.get("/", verifyAdmin, getAdminData);

export default router;
