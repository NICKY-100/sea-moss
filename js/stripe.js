
const { publishableKey } = await fetch('http://localhost:4242/config').then((r) => r.json());
if (!publishableKey) {
    addMessage(
        'No publishable key returned from the server. Please check `.env` and try again'
    );
    alert('Please set your Stripe publishable API key in the .env file');
}

const stripe = window.Stripe(publishableKey);

let checkout;
initialize();

const validateEmail = async (email) => {
    const updateResult = await checkout.updateEmail(email);
    const isValid = updateResult.type !== "error";

    return { isValid, message: !isValid ? updateResult.error.message : null };
};

document
    .querySelector("#payment-form")
    .addEventListener("submit", handleSubmit);

// Fetches a Checkout Session and captures the client secret
async function initialize() {

    const promise = fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: localStorage.getItem("cart")
    })
        .then((r) => r.json())
        .then((r) => r.clientSecret);

    const appearance = {
        theme: 'stripe',
    };
    checkout = await stripe.initCheckout({
        fetchClientSecret: () => promise,
        elementsOptions: { appearance },
    });

    document.querySelector("#button-text").textContent = `Pay ${checkout.session().total.total.amount
        } now`;
    const emailInput = document.getElementById("email");
    const emailErrors = document.getElementById("email-errors");

    emailInput.addEventListener("input", () => {
        // Clear any validation errors
        emailErrors.textContent = "";
    });

    emailInput.addEventListener("blur", async () => {
        const newEmail = emailInput.value;
        if (!newEmail) {
            return;
        }

        const { isValid, message } = await validateEmail(newEmail);
        if (!isValid) {
            emailErrors.textContent = message;
        }
    });

    const paymentElement = checkout.createPaymentElement();
    paymentElement.mount("#payment-element");
    const billingAddressElement = checkout.createBillingAddressElement({ display: { name: 'split' } });
    billingAddressElement.mount("#billing-address-element");
    const shippingAddressElement = checkout.createShippingAddressElement({ display: { name: 'split' } });
    shippingAddressElement.mount("#shipping-address-element");
}

async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    e.target.classList.add('was-validated')
    const email = document.getElementById("email").value;
    const { isValid, message } = await validateEmail(email);
    const emailMessage = document.getElementById("email-errors")
    if (!isValid) {
        emailMessage.textContent = message

        setLoading(false);
        return;
    }
    emailMessage.textContent = ""

    const { error } = await checkout.confirm();

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    showMessage(error.message);

    setLoading(false);
}

// ------- UI helpers -------

function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageContainer.textContent = "";
    }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}