export default class CheckoutDTO{
    constructor(subtotal, shipping, total, customerBalance) {
        this.subtotal=subtotal
        this.shipping = shipping
        this.total = total
        this.customerBalance = customerBalance
    }
}