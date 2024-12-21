function displayCart() {
    const cartPage = document.getElementById("cartpage");
    console.log(cartItems);

    let qtyTotal = 0;
    let cartItemTotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const product = document.querySelector(
            "#product-" + cartItem["product-id"]
        );

        const productId = cartItem["product-id"];

        cartItemTotal += cartItem.qty * products[productId].price;
        qtyTotal += cartItem.qty;

        if (!product) {

            const qtyText = new Text("qty: ");
            const priceText = new Text("price: ");
            const div = document.createElement("div");
            const h4 = document.createElement("h4");
            const qty = document.createElement("span");
            const price = document.createElement("span");

            div.append(h4, qtyText, qty, priceText, price);
            cartPage.appendChild(div);

            div.id = "product-" + cartItem["product-id"];
            qty.textContent = cartItem.qty;
            qty.classList.add("qty");
            price.classList.add("price");
            h4.textContent = products[cartItem["product-id"]].name;
            price.textContent = products[cartItem["product-id"]].price;

        } else {
            const productQty = product.querySelector(".qty");
            productQty.textContent = cartItem.qty;
            const productPrice = product.querySelector(".price");
            console.log(productQty);
        }
    }

    const items = document.getElementById("cart-item-total");

    items.textContent = qtyTotal;
    console.log(cartItemTotal);
    const total = document.getElementById("item-total");
    total.textContent = cartItemTotal;
}
