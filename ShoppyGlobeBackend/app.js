import express from 'express';
import cartRoutes from './routes/cartRoutes.js';
import productRoutes from './routes/productRoutes.js';
import authRoute from './routes/authRoute.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/cart', cartRoutes);
app.use('/products', productRoutes);
app.use('/auth', authRoute);


app.get('/', (req, res) => {
    res.send(`<h1 style="background-color: dodgerblue; color: white; padding: 20px; border-radius: 8px; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);">
                Welcome to ShoppyGlobe Backend
              </h1>
               <ul style="list-style-type: none; padding: 0; margin-top: 30px; font-size: 20px;">
                <li style="background-color: lime; padding: 20px; margin: 10px 0; border-radius: 5px;">
                    <strong>GET http://localhost:5555/products:</strong> Fetch a list of products from MongoDB.
                </li>
                <li style="background-color: lime; padding:  20px; margin: 10px 0; border-radius: 5px;">
                    <strong>GET http://localhost:5555/products/:id:</strong> Fetch details of a single product by its ID.
                </li>
                <li style="background-color:lime; padding:  20px; margin: 10px 0; border-radius: 5px;">
                    <strong>POST http://localhost:5555/cart:</strong> Add a product to the shopping cart.
                </li>
                <li style="background-color: lime; padding: 20px; margin: 10px 0; border-radius: 5px;">
                    <strong>PUT http://localhost:5555/cart/:id:</strong> Update the quantity of a product in the cart.
                </li>
                <li style="background-color: lime; padding: 20px; margin: 10px 0; border-radius: 5px;">
                    <strong>DELETE http://localhost:5555/cart/:id: </strong> Remove a product from the cart.
                </li>
            </ul>
        `);
});

export default app;