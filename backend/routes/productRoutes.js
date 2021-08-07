import express from 'express';
import {
  getProducts,
  getTopProducts,
  getBarleansProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview
} from '../controllers/productControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts);
router.route('/barleans').get(getBarleansProducts);

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
