import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = Router()

const manager = new ProductManager('./src/products.json');
let products = await manager.getProducts();

productsRouter.get('/', (req, res) => {
    const limit = parseInt(req.query.limit); 

    if (!isNaN(limit)) {
        return res.send({ products: products.slice(0, limit) });
    }

    res.send({ products });
});

productsRouter.get('/:pid', (req, res) => {

    const id = parseInt(req.params.pid)
    const selectedProduct = products.find(product => product.id === id)

    if(!selectedProduct) return res.send("Product not found")
    
    res.send({selectedProduct})
})

productsRouter.post('/', async (req, res) => {
    const product = req.body;

    const newProduct = {
        ...product,
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    };

    try {
        await manager.addProduct(newProduct);
        res.status(200).send({ status: 'success', message: 'Product added' });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});

productsRouter.put('/:productId', (req, res) => {
    const productId = +req.params.productId; 
    const productInfo = req.body;
    console.log(products)

    const productIndex = products.findIndex(product => product.id === productId);
    console.log(productIndex)

    if (productIndex === -1) {
        return res.status(404).send({ status: 'Error', message: 'Product not found' });
    }

    const updatedProduct = {
        ...products[productIndex], 
        ...productInfo,           
        id: productId             
    };

    try {
        manager.updateProduct(productId, updatedProduct);
        products[productIndex] = updatedProduct; 
        res.send({ status: 'Success', message: 'Product updated' });
    } catch (error) {
        res.status(500).send({ status: 'Error', message: 'Failed to update product' });
    }
});


productsRouter.delete('/:productId', (req, res) => {
    const productId = + req.params.productId
    const productsUpdated = products.filter(u => u.id !== productId)
    products = [...productsUpdated]

    try {
        manager.deleteProduct(productId);
        res.status(200).send({ status: 'success', message: 'Product deleted' });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }

    res.send({status: 'Success', payload: productsUpdated})
})

export default productsRouter;