import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';
import { rl } from '../index.js';
import { adminOperation } from '../index.js';
import { loadProducts } from './product-loader.mjs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default async function addProduct() {
    const products = await loadProducts();
    
    const newProduct = {};
    //due to fail in try/catch or invalid expiryDate i didn't used oldProducts.length
    const maxId = Math.max(...Object.values(products).map(p => p.id ?? -1));
    newProduct['id'] = maxId + 1;
    const steps = [askName, askPrice, askQuantity, askWeight, askExpiryDate];

    steps.reduce((promiseChain, step) => {
        return promiseChain.then(step);
    }, Promise.resolve(newProduct))
        .then(async (finalProduct) => {  
            const oldProducts = Object.values(products).map((p) => {
                const base = {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    quantity: p.quantity,
                };
                let expiryDateReview
                try {
                    expiryDateReview = new Date(p.expiryDate)
                } catch (err) {
                    console.log(`❌ ${err.message}`);
                    return
                }
                if (expiryDateReview instanceof Date && !isNaN(p.expiryDate)) {
                    base['expiryDate'] = p.expiryDate.toISOString();
                }

                if (Boolean(p.weight)) {
                    base['weight'] = p.weight;
                }

                base.type = p.constructor.name;
                return base;
            })
            
            

            const productArray = [...oldProducts,finalProduct]
            const filePath = path.join(__dirname, '../data/data.json');
            await writeFile(filePath, JSON.stringify(productArray, null, 2), 'utf-8');
            console.log("\nProduct added the final Product 👌🏻:", finalProduct);
            adminOperation()
        });

}

function askName(product) {
    return new Promise((resolve) => {
        rl.question("Enter product name: ", (name) => {
            product['name'] = name;
            resolve(product);
        });
    });
}

function askPrice(product) {
    return new Promise((resolve) => {
        rl.question("Enter product price: ", (price) => {
            if (!/^\d+(\.\d+)?$/.test(price)) {
                console.log("Invalid price.");
                return askPrice(product).then(resolve);
            }
            product['price'] = price;
            resolve(product);
        });
    });
}

function askQuantity(product) {
    return new Promise((resolve) => {
        rl.question("Enter product quantity: ", (quantity) => {
            if (!/^\d+(\.\d+)?$/.test(quantity)) {
                console.log("Invalid quantity. Please enter a non-negative integer.");
                return askQuantity(product).then(resolve);
            }
            product['quantity'] = quantity;
            resolve(product);
        });
    });
}

function askWeight(product) {
    return new Promise((resolve) => {
        rl.question("\nPlease enter the weight if the product is shippable if not enter 'N/n'?", async (weight) => {
            if (weight === 'N' || weight === 'n') {
                return resolve(product);
            }
            if (!/^\d+(\.\d+)?$/.test(weight)) {
                    console.log("Invalid weight. Please enter a number greater than 0.");
                    return askWeight(product).then(resolve);
                }
                product['weight'] = weight;
                resolve(product);
            });
    });
}
function isValidDate(dateStr) {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!regex.test(dateStr)) return false;
    const inputDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate instanceof Date &&
        !isNaN(inputDate.getTime()) &&
        inputDate > today;
}

function askExpiryDate(product) {
    return new Promise((resolve) => {
        rl.question("\nPlease enter the expiry date (YYYY-MM-DD) in the future that the product is it expires, if not enter 'N/n'?", async (expiryDate) => {
            if (expiryDate === 'N' || expiryDate === 'n') {
                product['type'] = product.weight == undefined ? 'Product' :'ShippableProduct'
                return resolve(product);
            }
            if (!isValidDate(expiryDate)) {
                console.log("Invalid date. Please use format YYYY-MM-DD.");
                return askExpiryDate(product).then(resolve);
            }
            product['expiryDate'] = expiryDate;
            product['type'] = product.weight == undefined ? 'ExpirableProduct' : 'ShippableExpirableProduct'
            resolve(product);
        });
    });
}