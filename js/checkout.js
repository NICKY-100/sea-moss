import { updateCart, displayCart } from "./updatecart.js";
/**
 * @import {CartItem} from './updatecart.js'
 */

/** @type {CartItem[]} */
const cartItems = JSON.parse(localStorage.getItem("cart")) || []

updateCart(cartItems)
displayCart()