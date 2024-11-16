import { Product } from '../models/productModel.js';

// function to get all products from the database
export const getAllProducts = async (req, res) => {
    try {
        // fetch all products from the Product collection
        const allProducts = await Product.find();

        // send the list of all products as the response
        res.json(allProducts);
    } 
    catch (error) {
        // handle any server errors
        res.status(500).json({ error: 'Server error' });
    }
};

// function to get a single product by its id
export const getProductById = async (req, res) => {
    try {
        // fetch the product using the id from request parameters
        const oneProduct = await Product.findById(req.params.id);

        // if the product exists, send it as the response
        // otherwise, send a 404 error indicating the product was not found
        oneProduct ? res.json(oneProduct) : res.status(404).json({ error: 'Product not found' });
    } 
    catch (error) {
        // handle any server errors
        res.status(500).json({ error: 'Server error' });
    }
};
