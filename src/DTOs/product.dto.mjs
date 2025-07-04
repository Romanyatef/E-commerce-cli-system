export default class ProductDTO{
    constructor(name, price, quantity, expiryDate = null, weight = null) {
        this.name = name
        this.price = price
        this.quantity = quantity
        this.expiryDate = expiryDate
        this.weight = weight
        
    }
}
