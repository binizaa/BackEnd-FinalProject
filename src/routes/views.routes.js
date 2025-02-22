import { Router } from "express";
import ProductManager from "../ProductManager.js";

const viewsRoutes = Router()
let isAdmin = false
const manager = new ProductManager('./src/products.json');
let products = await manager.getProducts();

viewsRoutes.get('/', (req, res) => {
    res.render('home', {products, style: "home.css", isAdmin});
});

viewsRoutes.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
});


viewsRoutes.post('/toggleAdmin', (req, res) => {
    isAdmin = !isAdmin; // Cambia el estado
    res.json({ success: true, isAdmin }); // Responde con el nuevo estado
})

export default viewsRoutes