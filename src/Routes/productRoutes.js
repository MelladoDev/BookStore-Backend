import express from 'express';
import {
    getProducts,
    getProduct,
    createNewProduct,
    updateProductById,
    deleteProductById
} from '../Controllers/productController.js';

import { verifyToken } from '../Middlewares/authMiddleware.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', getProducts);

// Obtener un producto por ID
router.get('/:id', getProduct);

// Crear un nuevo producto
router.post('/', verifyToken, createNewProduct);

// Actualizar un producto
router.put('/:id', verifyToken, updateProductById);

// Eliminar un producto
router.delete('/:id', verifyToken, deleteProductById);

export default router;
