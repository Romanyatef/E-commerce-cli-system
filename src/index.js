//package to read command line inputs 
import readline from 'readline';

import Customer from './models/customer.mjs';
import Cart from './models/cart.mjs';
import CheckoutService from './services/checkout.service.mjs';
import { loadProducts } from './utils/product-loader.mjs';
import addProduct from './utils/add-product.mjs';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const products = await loadProducts();


function listProducts() {
    console.log("\nAvailable Products (the stock will be updated after checkout):");
    let index = 1;
    for (const key in products) {
        const p = products[key];
        console.log(`${index++}. ${p.name} - $${p.price} (${p.quantity} in stock)`);
    }
}

let customer;
let cart = new Cart();

function askCustomerInfo() {
    rl.question("Enter your name: ", (name) => {
        rl.question("Enter your balance: ", (balanceStr) => {
            if (!/^\d+(\.\d+)?$/.test(balanceStr)) {
                console.log("Invalid balance.");
                return askCustomerInfo();
            }
            customer = new Customer(name, balanceStr);
            console.log(`\nWelcome, ${customer.name}!`);
            showProductMenu();
        });
    });
}

async function showProductMenu() {
    listProducts();
    rl.question("\nEnter product number to add to cart (or type 'checkout' to finish, or terminates now enter 'exit'): ", async (input) => {
        if (input.toLowerCase() === 'checkout') {
            return await doCheckout();
        } else if (input.toLowerCase() === 'exit') {
            console.log("Thank you for your purchase ✨");
            rl.close()
            return
        }

        const index = parseInt(input) - 1;
        const keys = Object.keys(products);
        if (isNaN(index) || index < 0 || index >= keys.length) {
            console.log("Invalid selection.");
            return await showProductMenu();
        }

        const selectedProduct = products[keys[index]];
        rl.question(`Enter quantity for ${selectedProduct.name}: `, async (qtyStr) => {
            const qty = parseInt(qtyStr);
            try {
                const totalQuantity = cart.items
                    .filter(item => item.product.name === selectedProduct.name)
                    .reduce((sum, item) => sum + item.quantity, 0);
                
                if ((totalQuantity+qty) > selectedProduct.quantity) {
                    console.log(`the product quantity is out of stock the available is ${selectedProduct.quantity - totalQuantity} if you perchase`);
                        return await showProductMenu()
                    }

                cart.add(selectedProduct, qty);
                console.log(`\n${qty}x ${selectedProduct.name} added to cart. 🛒`);
            } catch (err) {
                console.log(`❌ ${err.message}`);
            }
            await showProductMenu();
        });
    });
}

async function doCheckout() {
    try {       
        await CheckoutService.checkout(customer, cart, products);
        cart.clearCart()
        askAgain()
    } catch (err) {
        console.log(`❌ ${err.message}`);
        cart.clearCart()
        await showProductMenu()
    }
}

async function askAgain() {
    rl.question("\nWould you like to make another purchase 'Y/N'?", async (input) => {
        if (input.length == 1 && (input === 'Y' || input === 'y')) {
            await showProductMenu()
        } else if (input.length == 1 && (input === 'N' || input === 'n')) {
            rl.close();
            console.log("Thank you for your purchase ✨");
            return
        } else {
            console.log("Invalid operation please enter 'Y' or 'N'.");
            askAgain()
        }
    })
}
function askForPassword(callback) {
    rl.question("\nEnter the password 'exit' for exit: ", (pass) => {
        if (pass === 'exit') {
            rl.close();
            console.log('Goodbye 🖐🏻');
            return;
        } else if (pass !== 'admin') {
            console.log("Invalid password!");
            askForPassword(callback);
        } else {
            console.log("\nWelcome 💻");
            callback();
        }
    });
}
export function adminOperation() {
    rl.question("\nTo see all products write 'list', else if you want to add another product write 'add' or 'exit' to exit: ", async (input) => {
        if (input == 'exit') {
            console.log('Goodbye 🖐🏻');
            return rl.close()
        }
        if (input === 'list') {
            printPrettyProducts(products);
            return  adminOperation()
        } else if (input === 'add') {
            await addProduct(products);
        } else {
            console.log("Invalid option.");
            adminOperation();
        }
    });
}
function askAdminOperations() {
    askForPassword(adminOperation);
}


function printPrettyProducts(products) {
    console.log("\n📦 Available Products:");
    console.log("────────────────────────────────────────────");

    for (const key in products) {
        const p = products[key];
        const expiry = new Date(p.expiryDate) instanceof Date && !isNaN(p.expiryDate) ? p.expiryDate.toDateString() : undefined;
        const ship = p.weight ? '📬 Yes' : undefined;

        console.log(`🔹 ${p.name}`);
        console.log(`   💰 Price:     $${p.price}`);
        console.log(`   📦 Quantity:  ${p.quantity}`);
        expiry?console.log(`   🕓 Expiry:    ${expiry}`):'';
        ship?console.log(`   🚚 Shippable: ${ship}`):'';
        console.log("────────────────────────────────────────────");
    }
}

function chooseUserOrAdmin() {
    rl.question("Please choose whether you are a  customer 'C/c' or admin 'A/a', and you have your password: ", (agent) => {
        if (agent === 'c' || agent === 'C') {
            askCustomerInfo()
        } else if (agent === 'a' || agent === 'A') {
            askAdminOperations()
        }
    });
}

chooseUserOrAdmin()