import { Product } from '../models/productModel.js';
import { User } from '../models/userModel.js';

import mongoose from 'mongoose';

// function to add an item to the user's cart--------------------------------------------------------------------------------------
export const addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body; // extract product id and quantity from the request body

    try {
        // check if the product exists in the database
        const productExist = await Product.findById(productId);
        if (!productExist) {
            return res.status(404).json({ message: 'Product does not exist' }); // send error if product is not found
        }

        // ensure  quantity is at least 1
        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' }); // send error if quantity is invalid
        }

        // find  user by username
        const user = await User.findOne({ userName: req.user.userId });
        if (!user) return res.status(404).json({ message: 'User not found' }); //error if user is not found

        // check if the item is already in the cart
        const cartItem = user.userCart.find((item) => item.productId.toString() === productId);

        if (cartItem) {
            // if the item is already in the cart, update the quantity
            cartItem.quantity += quantity;
        } else {
            // if the item is not in the cart, add it as a new entry
            user.userCart.push({ productId, quantity });
        }

        // save the updated user document to the database
        await user.save();
        res.status(201).json({ message: 'Item added', userCart: user.userCart }); 
    } 
    catch (error) {
        // handle unexpected errors
        res.status(500).json({ message: error.message });
    }
};

// function to update the quantity of an item in the cart--------------------------------------------------------
export const updateCartItemQuantity = async (req, res) => {
    const { id: productId } = req.params; // id of the product in the cart
    const { quantity } = req.body;  // updated quantity

    try {
        const user = await User.findOne({ userName: req.user.userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItem = user.userCart.find((item) => item.productId.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.quantity = quantity; // Update quantity
        await user.save(); // Save the updated user

        res.json({ message: 'Cart item updated', userCart: user.userCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// function to remove an item from the user's cart-----------------------------------------------------------------------------------
export const removeItemFromCart = async (req, res) => {
    const { id: productId } = req.params; // extract the product id from the request params

    try {
        // find the user by their username
        const user = await User.findOne({ userName: req.user.userId });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // send error if user is not found
        }

        // convert the product id to an ObjectId for comparison
        const objectIdProductId = new mongoose.Types.ObjectId(productId);

        const cartItemIndex = user.userCart.findIndex((item) => item.productId.toString() === objectIdProductId.toString());

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' }); // send error if item is not found
        }

        // remove the item from the cart
        user.userCart.splice(cartItemIndex, 1);

        // save the updated user document
        await user.save();

        res.json({ message: 'Item removed successfully', userCart: user.userCart }); // confirm item was removed
    } catch (error) {
        // handle any unexpected errors
        res.status(500).json({ message: error.message });
    }
};
