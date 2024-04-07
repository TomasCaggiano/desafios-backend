import { ProductsManager } from './ProductsManager';
import {http} from 'http';
import {express} from 'express';

const server = http.CreateServer((req,res) => {})
const products = new ProductsManager(path)

server.listen (8080)

app.use(express.urlencoded({extended:true}))

app.get('/products', (req,res)=>{
    const limit = req.query.limit
    if (!limit) {
        return res.send(products.getProducts())}
    const productsLimit = products.keys(products=>products.limit<=limit);
        return res.send(productsLimit)
})

app.get('/products/:pid',(req,res)=>{
    console.log(req.params.pid)
    let getProductById = async(pid) => {
        try {
            const products = await this.readFile()
            const product =  products.find(prod => prod.id === pid) 

            if(!product) return 'producto no encontrado'

            return product
        } catch (error) {
            console.log(error)
        }
    }
    res.send(getProductById)
})

