document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const totalAmountDisplay = document.getElementById('total-amount');
    const checkoutButton = document.getElementById('checkout-button');
    const paymentSection = document.getElementById('payment-section');
    const paymentForm = document.getElementById('payment-form');
    const amountInput = document.getElementById('amount');

    let products = [
        { name: 'Apple', type: 'Fruit', price: 50 },
        { name: 'Banana', type: 'Fruit', price: 30 },
        { name: 'Carrot', type: 'Vegetable', price: 40 },
        { name: 'Tomato', type: 'Vegetable', price: 20 },
        { name: 'Potato', type: 'Vegetable', price: 25 },
        { name: 'Onion', type: 'Vegetable', price: 15 }
    ];

    let cart = [];

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.setAttribute('data-price', product.price);
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Type: ${product.type}</p>
                <p>Price: ₹${product.price}</p>
                <button class="buy-button">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
            productDiv.querySelector('.buy-button').addEventListener('click', function () {
                addToCart(product);
            });
        });
    }

    function addToCart(product) {
        cart.push(product);
        updateCart();
        alert(`${product.name} added to cart!`);
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((product, index) => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `${product.name} - ₹${product.price} <button class="remove-button" data-index="${index}">Remove</button>`;
            cartItems.appendChild(cartItem);
            total += product.price;
        });

        const deliveryOption = document.getElementById('delivery-option').value;
        if (deliveryOption === 'fast') {
            total += 20; // Add delivery charge for fast delivery
        }

        totalAmountDisplay.textContent = `Total: ₹${total}`;

        if (cart.length > 0) {
            checkoutButton.style.display = 'block'; // Show checkout button
        } else {
            checkoutButton.style.display = 'none'; // Hide checkout button
        }

        attachRemoveButtonEvents();
    }

    function attachRemoveButtonEvents() {
        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const index = button.getAttribute('data-index');
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    checkoutButton.addEventListener('click', function () {
        if (cart.length > 0) {
            paymentSection.style.display = 'block';
            amountInput.value = totalAmountDisplay.textContent.replace('Total: ₹', '');
        }
    });

    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const paymentName = document.getElementById('payment-name').value;
        const paymentEmail = document.getElementById('payment-email').value;
        const address = document.getElementById('address').value;
        const deliveryOption = document.getElementById('delivery-option').value;
        const amount = amountInput.value;
        const paymentMethod = document.getElementById('payment-method').value;

        let deliveryChargeMessage = deliveryOption === 'fast' ? ' (includes ₹20 delivery charge)' : '';

        if (paymentMethod === 'credit-card') {
            const cardNumber = document.getElementById('card-number').value;
            const cardHolderName = document.getElementById('card-name').value;
            const expirationDate = document.getElementById('expiration-date').value;
            const cvv = document.getElementById('cvv').value;

            alert(`Payment of ₹${amount} received from ${paymentName} (${paymentEmail}) for address: ${address}${deliveryChargeMessage} via Credit Card!`);
        } else if (paymentMethod === 'cod') {
            alert(`Order placed successfully for ₹${amount}. Cash on Delivery selected for address: ${address}${deliveryChargeMessage}!`);
        } else {
            alert(`Payment of ₹${amount} received from ${paymentName} (${paymentEmail}) for address: ${address}${deliveryChargeMessage} via UPI!`);
        }

        paymentForm.reset();
        paymentSection.style.display = 'none';
        cart = []; // Clear the cart after payment
        updateCart(); // Update cart display
    });

    document.getElementById('payment-method').addEventListener('change', function () {
        const creditCardInfo = document.getElementById('credit-card-info');
        creditCardInfo.style.display = this.value === 'credit-card' ? 'block' : 'none';
    });

    document.getElementById('delivery-option').addEventListener('change', updateCart);

    renderProducts();
});
let isSignedIn = false;

function showSignInInterface() {
    document.getElementById('signInInterface').classList.remove('hidden');
    document.getElementById('sellerInterface').classList.add('hidden');
    document.getElementById('userInterface').classList.add('hidden');
}

function showUserInterface() {
    document.getElementById('userInterface').classList.remove('hidden');
    document.getElementById('sellerInterface').classList.add('hidden');
}

function showSellerInterface() {
    document.getElementById('sellerInterface').classList.remove('hidden');
    document.getElementById('userInterface').classList.add('hidden');
}

function signOut() {
    isSignedIn = false;
    document.getElementById('signInInterface').classList.add('hidden');
    document.getElementById('signOutBtn').classList.add('hidden');
    document.getElementById('signInBtn').classList.remove('hidden');
    alert("Signed out successfully!");
}

document.getElementById('sellerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('sellerName').value;
    const address = document.getElementById('sellerAddress').value;
    const houseNumber = document.getElementById('houseNumber').value;
    const pincode = document.getElementById('sellerPincode').value;

    isSignedIn = true;
    document.getElementById('signInInterface').classList.add('hidden');
    document.getElementById('signOutBtn').classList.remove('hidden');
    document.getElementById('signInBtn').classList.add('hidden');

    alert(`Seller signed in: ${name}, Address: ${address}, House Number: ${houseNumber}, Pincode: ${pincode}`);
    this.reset();
});

document.getElementById('buyerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('buyerName').value;
    const address = document.getElementById('buyerAddress').value;
    const houseNumber = document.getElementById('buyerHouseNumber').value;
    const pincode = document.getElementById('buyerPincode').value;

    isSignedIn = true;
    document.getElementById('signInInterface').classList.add('hidden');
    document.getElementById('signOutBtn').classList.remove('hidden');
    document.getElementById('signInBtn').classList.add('hidden');

    alert(`Buyer signed in: ${name}, Address: ${address}, House Number: ${houseNumber}, Pincode: ${pincode}`);
    this.reset();
});
footer {
    margin-top: 20px;
    padding: 10px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.1); /* Slightly transparent background */
    color: white;
    position: relative;
    bottom: 0;
    width: 100%;
}