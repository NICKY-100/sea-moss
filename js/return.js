import { updateCart } from "./updatecart.js";
initialize();

async function initialize() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    const response = await fetch(`http://localhost:4242/session-status?session_id=${sessionId}`);
    const session = await response.json();

    if (session.status == "open") {
        window.replace("/checkout.html")
    } else if (session.status == "complete") {
        localStorage.setItem("cart", "[]")
        updateCart([])
        document.getElementById("success").classList.remove("hidden");
        document.getElementById("customer-email").textContent = session.customer_email
    }
}