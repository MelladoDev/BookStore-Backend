import express from 'express';
import {
  getCategories,
  getCategory,
  createNewCategory,
  updateCategoryById,
  deleteCategoryById
} from '../Controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', createNewCategory);
router.put('/:id', updateCategoryById);
router.delete('/:id', deleteCategoryById);

export default router;
