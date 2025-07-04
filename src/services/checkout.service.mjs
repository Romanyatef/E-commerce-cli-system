import ShippingService from "./shipping.service.mjs";
import CheckoutDTO from "../DTOs/checkout.dto.mjs";
import { saveProducts } from "../utils/save-products.mjs";

export default class CheckoutService {
    static async checkout(customer, cart, products) {
        const shippingFeeCost=30
        if (cart.isEmpty()) throw new Error("Cart is empty");
        if ((cart.hasExpiredItems()) || (cart.hasOutOfStockItems())) throw new Error("cart has a product is out of stock or expired");

        const subtotal = cart.getSubtotal();
        const shippables = cart.getShippableItems();
        const shippingFee = shippables.length ? shippingFeeCost : 0;
        const total = subtotal + shippingFee;

        if (customer.balance < total) throw new Error("Customer's balance is insufficient");

        ShippingService.ship(shippables);
        customer.deduct(total);
        await saveProducts(products,cart.items);

        console.log("\n** Checkout receipt **");
        for (let item of cart.items) {
            console.log(`${item.quantity}x ${item.product.name} ${item.product.price * item.quantity}`);
        }
        console.log("----------------------");
        console.log(`Subtotal ${subtotal}`);
        console.log(`Shipping ${shippingFee}`);
        console.log(`Amount ${total}`);
        console.log(`Customer Balance ${customer.balance}`);

        return new CheckoutDTO(subtotal, shippingFee, total, customer.balance);
    }
  }