import { updateCart } from './updatecart.js';
/**
 * @import {CartItem} from './updatecart.js'
 */



/** @type {CartItem[]} */
const cartItems = JSON.parse(localStorage.getItem("cart")) || []

const products = {
    bay_leaves: {
        name: "Bay leaves",
        price: 14.00
    },
    cinnamon_leaves: {
        name: "Cinnamon leaves",
        price: 13.99
    },
    guava_leaves: {
        name: "Guava leaves",
        price: 13.99
    },
    sea_moss: {
        name: "Sea moss",
        price: 22.00
    },
    soursop_leaves: {
        name: "Soursop leaves",
        price: 13.99
    }

};


// add to cart function which is to add products to cart with key and value
/**
 * 
 * @param {HTMLFormElement} form 
 */
function addToCart(form) {

    //    form data collection
    const formData = new FormData(form);

    //  mapping the formdata to get value to cartItem
    const cartItem = {};
    for (let [key, value] of formData) {
        if (key === "quantity") {
            value = parseInt(value);
        }
        cartItem[key] = value;

    }


    const items = document.getElementById("items");// hard code
    // finding cartItem to obtain if already added cart.and return true if found.
    const findCartItems = cartItems.find(function (value) {
        //matching current cart item to existing cart item.
        if (value.productId === cartItem.productId) {
            return true;
        }
    });
    // condition if cartItem is not found, then add to cart .
    if (!findCartItems) {
        //adding item to cart
        cartItems.push(cartItem);

    } else {
        //updating existing cart item quantity
        const sum = findCartItems.quantity + cartItem.quantity;
        findCartItems.quantity = sum;
    }
    // calculating total quantity of cartItem

}


/**
 * 
 * @param {CartItem[]} cart 
 */
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}
/** @type {HTMLFormElement} */
const form = document.getElementById("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    addToCart(form)
    updateCart(cartItems)
    saveCart(cartItems)
})
/** 
 * updates cart 
 */
updateCart(cartItems)