import ProductManager from './ProductManager.js';
import Product from './Product.js';
import express from 'express'

const test = async () => {
    // Ruta al archivo donde se guardarán los productos
    const manager = new ProductManager('./products.json');

    console.log("=== Inicio del test de ProductManager ===");

    // 1. Obtener productos (archivo inicialmente vacío)
    console.log("1. Productos iniciales (debería ser vacío):");
    let products = await manager.getProducts();
    console.log(products); // []

    // 2. Crear y agregar un producto
    console.log("\n2. Creando y agregando un producto...");
    const product1 = new Product({
        title: 'Laptop',
        description: 'Una laptop de alta gama',
        price: 1500,
        thumbnail: 'https://example.com/laptop.jpg',
        code: 'LT123',
        stock: 5
    });
    await manager.addProduct(product1);

    // 3. Verificar productos tras agregar uno
    console.log("\n3. Productos después de agregar uno:");
    products = await manager.getProducts();
    console.log(products);
    // [
    //   {
    //     id: 1,
    //     title: 'Laptop',
    //     description: 'Una laptop de alta gama',
    //     price: 1500,
    //     thumbnail: 'https://example.com/laptop.jpg',
    //     code: 'LT123',
    //     stock: 5
    //   }
    // ]

    // 4. Crear y agregar otro producto
    console.log("\n4. Creando y agregando un segundo producto...");
    const product2 = new Product({
        title: 'Mouse',
        description: 'Un mouse ergonómico',
        price: 25,
        thumbnail: 'https://example.com/mouse.jpg',
        code: 'MS456',
        stock: 50
    });
    await manager.addProduct(product2);

    // 5. Verificar productos después de agregar el segundo
    console.log("\n5. Productos después de agregar un segundo producto:");
    products = await manager.getProducts();
    console.log(products);
    // [
    //   {
    //     id: 1,
    //     title: 'Laptop',
    //     description: 'Una laptop de alta gama',
    //     price: 1500,
    //     thumbnail: 'https://example.com/laptop.jpg',
    //     code: 'LT123',
    //     stock: 5
    //   },
    //   {
    //     id: 2,
    //     title: 'Mouse',
    //     description: 'Un mouse ergonómico',
    //     price: 25,
    //     thumbnail: 'https://example.com/mouse.jpg',
    //     code: 'MS456',
    //     stock: 50
    //   }
    // ]

    // 6. Buscar un producto por ID
    console.log("\n6. Buscando producto con ID 2:");
    const productById = await manager.getProductById(2);
    console.log(productById);
    // {
    //   id: 2,
    //   title: 'Mouse',
    //   description: 'Un mouse ergonómico',
    //   price: 25,
    //   thumbnail: 'https://example.com/mouse.jpg',
    //   code: 'MS456',
    //   stock: 50
    // }

    // 7. Intentar buscar un producto con un ID inexistente
    console.log("\n7. Buscando producto con un ID inexistente:");
    const nonExistentProduct = await manager.getProductById(99);
    console.log(nonExistentProduct); // null

    console.log("\n=== Fin del test de ProductManager ===");
};

test()
