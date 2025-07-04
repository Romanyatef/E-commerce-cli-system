export default class Product{
    constructor(name, price, quantity) {
        this.name=name
        this.price=price
        this.quantity=quantity
    }
    isExpired() { return false }
    isShippable() { return false }
}