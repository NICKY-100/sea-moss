/**
 * @typedef {Object} CartItem
 * @property {string} productId
 * @property {number} quantity
 */
/**
 * updates cartItem to display current quantity of products in the cart.
 * @param {CartItem[]} cartItems
 */
export default function updateCart(cartItems) {
    const cartItemTotalElement = document.getElementById("cartquantity")
    const cartItemTotal = cartItems.reduce(
        (accumulator, item) => accumulator + item.quantity, 0


    );
    cartItemTotalElement.textContent = cartItemTotal
}