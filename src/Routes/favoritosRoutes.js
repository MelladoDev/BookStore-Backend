import express from 'express';
import FavoritosController from '../Controllers/favoriteController.js';
import { verifyToken } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, FavoritosController.getAll);
router.post('/', verifyToken, FavoritosController.add);
router.delete('/:id_favorito', verifyToken, FavoritosController.remove);

export default router;
