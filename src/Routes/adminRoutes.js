// routes/adminRoutes.js
import express from "express";
import { verifyAdmin } from "../Middlewares/adminMiddleware.js";
import AdminController from "../Controllers/adminController.js";

const router = express.Router();

// Ruta para que un admin se autentique (login) y obtenga su información
// Se espera que se envíen en los headers las credenciales (usuario y contraseña)
router.get("/me", verifyAdmin, AdminController.getAdmin);
router.get("/",  AdminController.getAdmin);
// Ruta para crear un nuevo administrador (convertir un usuario en admin)
// Solo se podrá acceder si el que realiza la petición tiene credenciales de admin válidas
router.post("/create",  AdminController.createAdmin);

export default router;
