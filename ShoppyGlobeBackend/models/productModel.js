
import mongoose from 'mongoose'; 

//===============================SCHEMAS===============================
//Schema for Products
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true }
});
export const Product = mongoose.model('Product', ProductSchema);
