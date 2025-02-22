import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async addProduct(product) {
        try {
            // Load products
            this.products = await this.getProducts();
    
            // Ensure products is an array
            if (!Array.isArray(this.products)) {
                throw new Error("Products data is not an array");
            }
    
            // Add unique ID and push the new product
            product.id = this.products.length > 0 
                ? this.products[this.products.length - 1].id + 1 
                : 1;
    
            this.products.push(product);
    
            // Save to file
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    
            console.log("Product added successfully:", product);
            return { status: 'success', product };
        } catch (error) {
            throw new Error(`Failed to add product: ${error.message}`);
        }
    }
    

    async getProducts() {
        try {
            const result = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(result);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                throw new Error(`Error reading the file: ${error.message}`);
            }
        }
    }  
    
    async deleteProduct(idProduct) {
        try {
            this.products = await this.getProducts();
    
            const productIndex = this.products.findIndex(product => product.id === idProduct);
            if (productIndex === -1) {
                throw new Error(`Product with ID ${idProduct} not found`);
            }
    
            const [deletedProduct] = this.products.splice(productIndex, 1);
    
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
            console.log("Product deleted successfully:", deletedProduct);
    
            return { status: 'success', product: deletedProduct };
        } catch (error) {
            console.error("Error deleting product:", error.message);
            throw new Error(`Failed to delete product: ${error.message}`);
        }
    }

    async updateProduct(idProduct, updatedProduct) {
        try {
            this.products = await this.getProducts();
    
            const productIndex = this.products.findIndex(product => product.id === idProduct);
            if (productIndex === -1) {
                throw new Error(`Product with ID ${idProduct} not found.`);
            }
    
            this.products[productIndex] = updatedProduct;
    
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
            console.log("Product updated successfully:", updatedProduct);
    
            return { status: 'success', product: updatedProduct };
        } catch (error) {
            console.error("Error updating product:", error.message);
            throw new Error(`Failed to update product: ${error.message}`);
        }
    }
    

    async getProductById(id) {
        try {
            this.products = await this.getProducts();

            const product = this.products.find(product => product.id == id);
            if (!product) {
                console.log(`Error: Product with ID "${id}" not found.`);
                return null;
            }
            return product;
        } catch (error) {
            console.error("Error retrieving product by ID:", error);
            return null;
        }
    }
}

export default ProductManager;
