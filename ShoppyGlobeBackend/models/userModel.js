import mongoose from 'mongoose'; 

//Schema for Cart
const CartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 }
});

//Schema for User---> having nested CART schema
const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    userCart: [CartSchema]
});
export const User = mongoose.model('User', UserSchema);
