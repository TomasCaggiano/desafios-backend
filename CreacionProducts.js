const {ProductsManager} = require ("./ProductsManager");
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