import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/product.mjs';
import ExpirableProduct from '../models/expirable-product.mjs';
import { ShippableProduct, ShippableExpirableProduct } from '../models/shippable-product.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productClasses = {
    Product,
    ExpirableProduct,
    ShippableProduct,
    ShippableExpirableProduct
};


export async function loadProducts() {
    const data = await fs.readFile(path.join(__dirname, '../data/data.json'), 'utf-8');
    const rawProducts = JSON.parse(data);
    const products = {};
    for (const item of rawProducts) {
        const { id, type, name, price, quantity, expiryDate, weight } = item;
        const ProductClass = productClasses[type];
        
        if (!ProductClass) throw new Error(`Unknown product type: ${type}`);
        const instance = type === 'ShippableExpirableProduct'
            ? new ProductClass(name, price, quantity, expiryDate, weight)
            : type === 'ShippableProduct'
                ? new ProductClass(name, price, quantity, weight)
                : type === 'ExpirableProduct'
                    ? new ProductClass(name, price, quantity, expiryDate)
                    : new ProductClass(name, price, quantity);
        
        instance.id = id;
        products[name.toLowerCase()] = instance;
    }

    return products;
}
