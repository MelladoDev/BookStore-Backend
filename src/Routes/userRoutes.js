import express from 'express';
import UsuarioController from '../Controllers/userController.js';
import { verifyToken } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, UsuarioController.getAll);
router.get('/:id',verifyToken, UsuarioController.getById);
router.post('/', UsuarioController.create);
router.put('/:id', verifyToken,UsuarioController.update);
router.delete('/:id',verifyToken, UsuarioController.delete);

export default router;