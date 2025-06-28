/**
 * @import {CartItem} from './updatecart.js'
 */

const products = {

    bay_leaves: {
        name: "Bay leaves",
        price: 13.99,
        image: "/images/IMG-bay-removebg-preview.png",
        price_id: "price_1RZFBRB9fqBDpO7FAPGTymY0"
    },
    cinnamon_leaves: {
        name: "Cinnamon leaves",
        price: 13.99,
        image: "/images/IMG-cinnamon-removebg-preview.png",
        price_id: "price_1RZFDRB9fqBDpO7FSTnHgySD"
    },
    guava_leaves: {
        name: "Guava leaves",
        price: 13.99,
        image: "/images/IMG-guava-removebg-preview.png",
        price_id: "price_1RZFEEB9fqBDpO7FvgW3oMiG"
    },
    sea_moss_1: {
        name: "Sea moss",
        price: 12.00,
        image: "/images/IMG-sea-moss-removebg-preview.jpg",
        price_id: "price_1RVz9LB9fqBDpO7FaEDmIPeG"
    },
    soursop_leaves: {
        name: "Soursop leaves",
        price: 15.00,
        image: "/images/IMG-soursop-removebg-preview.png",
        price_id: "price_1RZFEwB9fqBDpO7FItgTelNU"
    }

};

/** @type {CartItem[]} */
export const cartItems = JSON.parse(localStorage.getItem("cart")) || []
/**
 * @typedef {Object} CartItem
 * @property {string} productId
 * @property {number} quantity
 * @property {string} price_id
 */
/**
 * updates cartItem to display current quantity of products in the cart.
 * @param {CartItem[]} cartItems
 */
export function updateCart(cartItems) {
    const cartItemTotalElement = document.getElementById("cartquantity")
    const cartItemTotal = cartItems.reduce(
        (accumulator, item) => accumulator + item.quantity, 0


    );
    cartItemTotalElement.textContent = cartItemTotal
}

/**
 * 
 */
export function displayCart(editable) {
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
            const price = document.createElement("strong");
            /** @type {HTMLImageElement} */
            const image = document.createElement("img");

            const row = document.createElement("div")
            const colImage = document.createElement("div")
            const colTitle = document.createElement("div")
            //
            const colQty = document.createElement("div")
            const colPrice = document.createElement("div")




            li.append(row);
            row.append(colImage, colTitle, colQty, colPrice)
            colImage.append(image)
            colTitle.append(h4)
            colPrice.append(price)
            cartPage.appendChild(li);

            li.id = "product-" + cartItem.productId;
            li.classList.add("list-group-item")

            qty.textContent = cartItem.quantity.toString();
            qty.classList.add("qty");

            row.classList.add("d-flex", "gap-3")
            colTitle.classList.add("flex-grow-1")

            h4.classList.add("mb-3")
            image.classList.add("image-fluid", "object-fit-contain")

            price.classList.add("price");
            h4.textContent = products[cartItem.productId].name;
            price.textContent = new Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(
                products[cartItem.productId].price
            )
            image.src = products[cartItem.productId].image;
            image.height = 64;
            image.width = 64;

            if (editable) {
                const removeBtn = document.createElement("button")
                const input = document.createElement("input")
                colTitle.append(removeBtn)
                colQty.append(input)
                removeBtn.classList.add("btn", "btn-secondary", "btn-sm")
                input.classList.add("form-control")
                removeBtn.textContent = "remove";
                removeBtn.addEventListener("click", () => {
                    li.remove()
                    cartItems.splice(i, 1)
                    updateCart(cartItems)
                    cartItemTotal -= cartItem.quantity * products[productId].price;
                    qtyTotal -= cartItem.quantity;
                    updateQuantity(qtyTotal, cartItemTotal)
                    localStorage.setItem("cart", JSON.stringify(cartItems))
                })
                removeBtn.textContent = "remove";
                removeBtn.addEventListener("click", () => {
                    li.remove()
                    cartItems.splice(i, 1)
                    updateCart(cartItems)
                    cartItemTotal -= cartItem.quantity * products[productId].price;
                    qtyTotal -= cartItem.quantity;
                    updateQuantity(qtyTotal, cartItemTotal)
                    localStorage.setItem("cart", JSON.stringify(cartItems))
                })
                // update if statement to allow number to change, not a string 
                input.addEventListener("input", () => {
                    const qtyNum = parseInt(input.value)
                    if (isNaN(qtyNum)) {
                        input.value = ""
                        return

                    } else if (qtyNum < 1) {
                        li.remove()
                        cartItems.splice(i, 1)
                        cartItemTotal -= cartItem.quantity * products[productId].price;
                        qtyTotal -= cartItem.quantity
                        localStorage.setItem("cart", JSON.stringify(cartItems))
                    } else if (cartItem.quantity < qtyNum) {

                        const newQty = cartItem.quantity - qtyNum
                        cartItemTotal -= newQty * products[productId].price;
                        qtyTotal -= newQty;

                    } else {
                        const newQty = qtyNum - cartItem.quantity
                        cartItemTotal += newQty * products[productId].price;
                        qtyTotal += newQty;
                    }
                    cartItem.quantity = qtyNum

                    updateCart(cartItems)
                    updateQuantity(qtyTotal, cartItemTotal)
                    localStorage.setItem("cart", JSON.stringify(cartItems))
                })
                input.value = cartItem.quantity.toString();
                input.type = "number"

            } else {
                colQty.append(cartItem.quantity.toString());
            }

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
    updateQuantity(qtyTotal, cartItemTotal)
}
function updateQuantity(qtyTotal, cartItemTotal) {
    const items = document.getElementById("cart-item-total");

    items.innerHTML = "Quantity: <strong>" + qtyTotal.toString() + "</strong>";
    console.log(cartItemTotal);
    const total = document.getElementById("item-total");
    total.innerHTML = "Total price: <strong>" + new Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(
        cartItemTotal
    ) + "</strong>"
}