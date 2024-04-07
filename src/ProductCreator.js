import { ProductsManager } from "./ProductsManager"; 
const path = '.file/Prducts.json'

const products = new ProductsManager(path)

const main = async () =>{
    const response = await products.addProducts({
        title: 'motherboard',
        price: 200,
        stock: 3,
        category: 'componentes',
        code: '00123021'
    })
    console.log(response)
} 

main()

const main2 = async () =>{
    const response = await products.addProducts({
        title: 'RAM8GB',
        price: 20,
        stock: 7,
        category: 'componentes',
        code: '00123033'
    })
    console.log(response)
} 

main2()

const main3 = async () =>{
    const response = await products.addProducts({
        title: 'RAM16GB',
        price: 35,
        stock: 10,
        category: 'componentes',
        code: '00123411'
    })
    console.log(response)
} 

main3()

