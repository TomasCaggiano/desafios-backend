const fs = require ('node:fs')

class ProductsManager{
    constructor(path){
        this.path = path
    }
    
    readFile = async()=>{
        try{
            const dataJson = await fs.promises.readfile(this.path, 'utf-8')
            return JSON.parse(dataJson)
        }catch(error){
            return []
        };
    }

    addProducts = async(product) => {
        try {
            const products = await this.readFile()

            if(products.length === 0){
                product.id = 1
            } else {
                product.id = products[products.length-1].id+1
            }
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8')
            return products
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
    const product =  products.find(prod => prod.id === pid)
    if(!product) return 'producto no encontrado'
    const productUpdate = product({
        title: '',
        price: '',
        stock: '',
        category: '',
        code: ''
    })
    await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8')
    return productUpdate

} catch (error) {
    console.log(error)
}
    }

    deleteProduct = async(pid) => {try {
        const products = await this.readFile()
        const product =  products.find(prod => prod.id === pid)
        if(!product) return 'producto no encontrado'
        await fs.promises.unlink(this.path, JSON.stringify(products), 'utf-8')
        return products
    } catch (error) {
        console.log(error)
    }}
}

module.exports = {
    ProductsManager
}