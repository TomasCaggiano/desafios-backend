import express from 'express';
import { ProductsManager } from './productsManager.js';
import {http} from 'http';
import { productsRouter } from './routes/products.router.js';
import { CartManager } from './CartManager.js';
import { cartRouter } from './routes/cart,router.js';


const app = express ();

export const productsManager = new ProductsManager;
export const cartManager = new CartManager;

app.use('/products', productsRouter)
app.use(express.json())
app.use('/carts', cartRouter)
 
app.listen (8080, (req, res)=>{
    console.log('server escuchando correctamente el puerto 8080')

}) 
