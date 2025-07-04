export default class Cart{
    constructor() {
        this.items = []
    }
    
    add(product, quantity) {
        if (quantity > product.quantity) {
            throw new Error(`Not enough quantity for ${product.name}`);
        }
        this.items.push({product, quantity})
    }
    
    isEmpty() {
        return this.items.length === 0;
    }

    hasExpiredItems() {
        return this.items.some(({product})=> product.isExpired())
    }

    hasOutOfStockItems() {
        return this.items.some(({ product, quantity }) => quantity > product.quantity)
    }

    getSubtotal() {
        return this.items.reduce((sum,item)=>sum + (item.product.price * item.quantity),0)
    }

    getShippableItems() {
        return this.items.filter(({ product }) => product.isShippable()).flatMap(({ product, quantity }) => Array(quantity).fill(product));
      }

    clearCart() {
        this.items= []
    }
}