const fs = require ('node:fs')

export class ProductsManager{
    constructor(path){
        this.path = 'products.json';
        this.products = []
    }
    
    readFile = async()=>{
        try{
            const dataJson = await fs.promises.readfile(this.path, 'utf-8')
            return JSON.parse(dataJson)
        }catch(error){
            return []
        };
    }

    addProducts = async({title, description, price, thumbnail, code, stock, status = true, category}) => {
        try {
            const productsid =  await this.readFile()

            if(productsid.length === 0){
                product.id = 1
            } else {
                product.id = productsid[productsid.length-1].id+1
            }
            let newProduct = {productsid, title, description, price, thumbnail, code, stock, status, category}
            
            this.products = await this.getProducts()
            this.products.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')
            return newProduct;
        } catch (error) {
            console.log(error)
        }

    }

    getProducts = async() => {
        try {
            return await this.readFile()

        } catch (error) {
            console.log(error)
        }
    } 

    getProductById = async(pid) => {
        try {
            const products = await this.readFile()
            const product =  products.find(prod => prod.id === pid) 

            if(!product) return 'producto no encontrado'    

            return product
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async(pid, productUpdate) => {
try {
    const products = await this.readFile()
    const product = response.findIndex(prod => prod.id === pid)
    if(product !== -1){
        products[product] = {id, productUpdate}
        await fs.writeFile(this.path, JSON.stringify(products), 'utf-8')
        return products[product]
    }else{
        return 'producto no encontrado'
    }

} catch (error) {
    console.log(error)
}
    }

    deleteProduct = async(pid) => {
        const products = await this.readFile()
        const product =  products.find(prod => prod.id === pid)
        if(product !== 1) {products.splice(product, 1)
        await fs.writeFile(this.path, JSON.stringify(products), 'utf-8')
        return products}
    else{ 
        return 'producto no encontrado'
    }}
}
