import updateCart from "./updatecart.js";
/**
 * @import {CartItem} from './updatecart.js'
 */

const products = {

    bay_leaves: {
        name: "bay leaves",
        price: 200
    },
    cinnamon_leaves: {
        name: "cinnamon leaves",
        price: 100
    },
    guava_leaves: {
        name: "guava leaves",
        price: 100
    },
    sea_moss_1: {
        name: " sea moss",
        price: 100
    },
    soursop_leaves: {
        name: "soursop leaves",
        price: 200
    }

};

/** @type {CartItem[]} */
const cartItems = JSON.parse(localStorage.getItem("cart")) || []
/**
 * 
 */
function displayCart() {
    const cartPage = document.getElementById("cartPage");
    console.log(cartItems);

    let qtyTotal = 0;
    let cartItemTotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const product = document.querySelector(
            "#product-" + cartItem.productId
        );

        const productId = cartItem.productId;

        cartItemTotal += cartItem.quantity * products[productId].price;
        qtyTotal += cartItem.quantity;

        if (!product) {
            /**
             * to create a cartItem that displays the name, price, quantity
             */
            const qtyText = new Text("qty: ");
            const priceText = new Text("price: ");
            const li = document.createElement("li");
            const h4 = document.createElement("h4");
            const qty = document.createElement("span");
            const price = document.createElement("span");

            li.append(h4, qtyText, qty, priceText, price);
            cartPage.appendChild(li);

            li.id = "product-" + cartItem.productId;
            li.classList.add("list-group-item")
            qty.textContent = cartItem.quantity.toString();
            qty.classList.add("qty");
            price.classList.add("price");
            h4.textContent = products[cartItem.productId].name;
            price.textContent = products[cartItem.productId].price;

        } else {
            /**
             * updating the cartItem
             */
            const productQty = product.querySelector(".qty");
            productQty.textContent = cartItem.quantity.toString();
            const productPrice = product.querySelector(".price");
            console.log(productQty);
        }
    }

    const items = document.getElementById("cart-item-total");

    items.textContent = qtyTotal.toString();
    console.log(cartItemTotal);
    const total = document.getElementById("item-total");
    total.textContent = cartItemTotal.toString();
}
updateCart(cartItems)
displayCart()