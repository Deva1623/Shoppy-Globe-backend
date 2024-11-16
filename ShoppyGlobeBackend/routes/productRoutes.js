
import express from 'express';
import { getAllProducts, getProductById } from '../controllers/productController.js';

// router for managing product-related routes
const router = express.Router();

// route to get all the products in  store
router.get('/', getAllProducts);

// route to get a specific product by  id
router.get('/:id', getProductById);

export default router;
