import Product from "./product.mjs";
import ExpirableProduct from "./expirable-product.mjs";

export class ShippableProduct extends Product{
    constructor(name, price, quantity, weight) {
        super(name, price, quantity)
        this.weight=weight
    }
    isShippable() {
        return true;
    }

    getName() {
        return this.name
    }
    getWeight() {
        return this.weight
    }
}


export class ShippableExpirableProduct extends ExpirableProduct{
    constructor(name, price, quantity, expiryDate, weight) {
        super(name, price, quantity, expiryDate)
        this.weight= weight
    }
    isShipppable() {
        return true
    }

    getName() {
        return this.name
    }

    getWeight() {
        return this.weight
    }
}