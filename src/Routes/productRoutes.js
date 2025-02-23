import express from 'express';
import {
    getProducts,
    getProduct,
    createNewProduct,
    updateProductById,
    deleteProductById
} from '../Controllers/productController.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', getProducts);

// Obtener un producto por ID
router.get('/:id', getProduct);

// Crear un nuevo producto
router.post('/', createNewProduct);

// Actualizar un producto
router.put('/:id', updateProductById);

// Eliminar un producto
router.delete('/:id', deleteProductById);

export default router;
