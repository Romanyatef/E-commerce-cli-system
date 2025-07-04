export default class Customer{
    constructor(name, balance) {
        this.name = name
        this.balance=balance
    }
    deduct(amount) {
        if (this.balance < amount) {
            throw new Error("Insufficient balance")
        }
        this.balance -=amount
    }
}