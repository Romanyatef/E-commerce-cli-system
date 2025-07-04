import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function saveProducts(products, cartList) {
    for (const item of cartList) {
        const productName = item.product.name.toLowerCase();
        
        if (products[productName]) {
            products[productName].quantity -= item.quantity;
            
        }
    }

    const productArray = Object.values(products).map((p) => {
        const base = {
            id: p.id,
            name: p.name,
            price: p.price,
            quantity: p.quantity,
        };
        let expiryDateReview
        try {
            expiryDateReview = new Date(p.expiryDate)
        } catch(err) {
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
    });

    const filePath = path.join(__dirname, '../data/data.json');
    await writeFile(filePath, JSON.stringify(productArray, null, 2), 'utf-8');
}
