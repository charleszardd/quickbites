export function formatPrice(price) {
    return `₱${price.toFixed(2)}`;
}

export function calculateTotal(items) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
