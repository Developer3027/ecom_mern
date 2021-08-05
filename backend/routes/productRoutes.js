import express from 'express';
import {
  getProducts,
  getBarleansProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct
} from '../controllers/productControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/barleans').get(getBarleansProducts);

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
