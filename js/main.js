// Import the Bootstrap bundle
//
// This includes Popper and all of Bootstrap's JS plugins.

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


/** @type {CartItem[]} */
const cartItems = [

];

const products = {
    1: {
        name: "Sea moss",
        price: 200
    },
    2: {
        name: "Sea moss 2",
        price: 100
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

    const cartItemTotalElement = document.getElementById("cartquantity")
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
    const cartItemTotal = cartItems.reduce(
        (accumulator, item) => accumulator + item.quantity, 0


    );
    cartItemTotalElement.textContent = cartItemTotal
    saveCart(cartItems)
}
/** @type {HTMLFormElement} */
const form = document.getElementById("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    addToCart(form)
})
/**
 * @typedef {Object} CartItem
 * @property {string} productId
 * @property {number} quantity
 */
/**
 * 
 * @param {CartItem[]} cart 
 */
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}

// const formProduct1 = document.getElementById("product-form-1");
// const formProduct2 = document.getElementById("product-form-2");

// formProduct1.addEventListener("submit", submitForm);
// formProduct2.addEventListener("submit", submitForm);
