
import express from 'express';
import { addItemToCart } from '../controllers/cartController.js';
import { authenticateUser } from '../middleware.js';
import { updateCartItemQuantity } from '../controllers/cartController.js'; 
import { removeItemFromCart} from '../controllers/cartController.js';

const router = express.Router();

router.post('/', authenticateUser, addItemToCart);       
router.put('/:id', authenticateUser, updateCartItemQuantity); // Update quantity
router.delete('/:id', authenticateUser, removeItemFromCart);  // Remove item


export default router;
