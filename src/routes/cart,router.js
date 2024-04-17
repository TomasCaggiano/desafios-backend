import { Router } from "express";
import { cartManager } from "../app.js";

const cartRouter = Router();

cartRouter.post('/', async(req, res)=>{
    try {
        const newCart = await cartManager.newCart()
        res.json(newCart)
    } catch (error) {
        res.send('error al crear carrito')
    }
})

cartRouter.get('/:cid', async (req, res)=>{
    const { cid } = req.params;
    try {
        const cart = await cartManager.getCartProducts(cid)
        res.send(cart)
    } catch (error) {
        res.send('error al intentar enviar los productos del carrito')
    }
})

cartRouter.post('/:cid/products/:pid', async(req, res)=>{
    const { cid, pid } = req.params;
    try {
        await cartManager.addProductToCart(cid, pid)
        res.send('producto agregado')
    } catch (error) {
        res.send('error al intentar guardar producto en el carrito')
    }
})

export {cartRouter}