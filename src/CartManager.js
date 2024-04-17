const fs = require ('node:fs')


export class CartManager{

    constructor(){
        this.path = 'cart.json';
        this.carts = []
    }

    readFile = async()=>{
        try{
            const dataJson = await fs.promises.readfile(this.path, 'utf-8')
            return JSON.parse(dataJson)
        }catch(error){
            return []
        };
    }
    getCarts = async () =>{
        const read = await this.readFile()
    }

    getCartProducts = async (cid) =>{
        const carts = await this.readFile();
        const cart = carts.find(cart=>cart.id === cid); 
        if(cart){
            return  cart.products
        }else{
            console.log('producto no encontrado')
        }
    }

    newCart = async() =>{
        const cartsid =  await this.readFile()

        if(cartsid.length === 0){
            cart.id = 1
        } else {
            cart.id = cartsid[cartsid.length-1].id+1
        }
        const newCart = ({id, products: []})

        this.carts = await this.getCarts()
        this.carts.push(newCart)
        await fs.writeFile(this.path, JSON.stringify(this.carts))
        return newCart;
    }

    addProductToCart = async (cartId, productId) =>{
        const read = await this.readFile()
        const index = carts.findIndex(cart=>cart.id===cartId)
        if(index !== -1){
            const cartProducts = await this.getCartProducts(cartId)
            const productIndex = cartProducts.findIndex(product => product.productId === productId )
            if(productIndex !== 1){
                cartProducts[productIndex].quantity =  cartProducts[productIndex].quantity + 1
            }else{
                cartProducts.push({productId, quantity : 1})
            }
            cart[index].products = cartProducts

            await fs.writeFile(this.path, JSON.stringify(this.carts))
            console.log('producto agregado exitosamente')
        }else{
            console.log('carrito no encontrado')
        }
    }
}