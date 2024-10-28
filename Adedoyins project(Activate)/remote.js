let cart = [];

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block'; // Show selected section
    }
}

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    totalPriceElem.textContent = `Total: $${total.toFixed(2)}`;
    showSection('cart');
}

function checkout() {
    showSection('checkout');
}

function generateOrderID() {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function processPayment(event) {
    event.preventDefault();

    const name = document.querySelector('#checkout input[name="name"]').value;
    const address = document.querySelector('#checkout input[name="address"]').value;
    const totalAmount = document.getElementById('total-price').textContent.split('$')[1];
    const orderID = generateOrderID();

    alert(`Processing payment of $${totalAmount} for ${name}. Order ID: ${orderID}.`);

    // Clear the cart
    cart = [];
    updateCart();
    showSection('confirmation');
    document.getElementById('confirmation').innerHTML += `<p>Your order ID is: ${orderID}</p>`;
}
