export default class ShippingService {
    static ship(items) {
        if (!items.length) return;

        console.log("** Shipment notice **");

        const counts = {};
        for (let item of items) {
            const key = `${item.getName()} ${item.getWeight() * 1000}g`;
            counts[key] = (counts[key] || 0) + 1;
        }

        let totalWeight = 0;
        for (let key in counts) {
            const weight = parseFloat(key.split(" ")[1]) / 1000;
            console.log(`${counts[key]}x ${key}`);
            totalWeight += weight * counts[key];
        }

        console.log(`Total Package Weight ${totalWeight.toFixed(1)}kg`);
    }
}
