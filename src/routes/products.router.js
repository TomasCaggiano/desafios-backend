import { Router } from "express";
import { productsManager } from "../app";

const productsRouter = Router()

//http://localhost:8080/products
productsRouter.get('/', async(req, res)=>{
    try {
        const { limit }= req.query;
        const products = await productsManager.getProducts()
        if(limit){
            const limited = products.slice(0, limit)
            return res.json(limited)
        }
        return res.json(products)
    } catch (error) {
        console.log(error)
    }

})

productsRouter.get('/:pid', async (req, res)=>{
    try {
        const {pid} = req.params;
        const products = await productsManager.getProductById(pid)
        res.json(products)
    } catch (error) {
        console.log(error)
    }
})

productsRouter.post(async(req, res)=>{
    try {
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const products = await productsManager.addProducts({title, description, price, thumbnail, code, stock, status, category})
        res.json(products)
    } catch (error) {
        console.log(error)
    }

})

productsRouter.put('/:pid', async (req, res)=>{
    const {pid} = req.params;
try {
    const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
    const products = await productsManager.updateProduct(pid,{title, description, price, thumbnail, code, stock, status, category})
    res.json(products)
} catch (error) {
    console.log(error)
}

})

productsRouter.delete('/',async (req, res) => {
    const {pid} = req.params;
    try {
        await productsManager.deleteProduct(pid)
        res.send('producto eliminado')
    } catch (error) {
        console.log('producto no encontrado')
    }
})


export {productsRouter}