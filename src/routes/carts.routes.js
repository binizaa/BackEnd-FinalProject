import { Router } from "express";
import ProductManager from "../ProductManager.js";

const cartsRouter = Router();
const manager = new ProductManager('./src/carts.json');
const managerProducts = new ProductManager('./src/products.json');
const carts = await manager.getProducts();
let products = await managerProducts.getProducts();

cartsRouter.get('/:cid', (req, res) => {
    const id = parseInt(req.params.cid);
    const selectedCart = carts.find(cart => cart.id === id);

    if (!selectedCart) return res.status(404).send({ status: 'Error', message: 'Cart not found' });
    res.send(selectedCart);
});

cartsRouter.post('/', async (req, res) => {
    const product = req.body;

    const newCart = {
        ...product,
        id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
        products: product.products || [] 
    };

    try {
        await manager.addProduct(newCart);
        res.status(200).send({ status: 'success', message: 'Cart added' });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const cart = carts.find(c => c.id === cid);

    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    const product = products.find(p => p.id === pid);
    
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (!cart.products) {
        cart.products = [];
    }

    const existingProduct = cart.products.find(p => p.productId === pid);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.products.push({ productId: pid, quantity: 1 });
    }

    manager.updateProduct(cid, cart)

    res.status(200).json({ message: 'Product added to cart', cart });
});

export default cartsRouter;
