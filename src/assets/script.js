// Global Variables
const products = [
    {
        name: "Gold Ring",
        price: 100,
        quantity: 0,
        productId: 100,
        image: "./images/ring.jpg" // Replace with the correct image path
    },
    {
        name: "Gold Earrings",
        price: 150,
        quantity: 0,
        productId: 101,
        image: "./images/earrings.jpg" // Replace with the correct image path
    },
    {
        name: "Gold Necklace",
        price: 200,
        quantity: 0,
        productId: 102,
        image: "./images/necklace.jpg" // Replace with the correct image path
    }
];

const cart = [];
let totalPaid = 0;

// Helper Functions
function findProductById(productId) {
    return products.find(product => product.productId === productId);
}

function findCartItemById(productId) {
    return cart.find(item => item.productId === productId);
}

// Cart Functions
function addProductToCart(productId) {
    const product = findProductById(productId);
    if (!product) return;

    const cartItem = findCartItemById(productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function increaseQuantity(productId) {
    const cartItem = findCartItemById(productId);
    if (cartItem) {
        cartItem.quantity++;
    }
    renderCart();
}

function decreaseQuantity(productId) {
    const cartItem = findCartItemById(productId);
    if (cartItem) {
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
            removeProductFromCart(productId);
        }
    }
    renderCart();
}

function removeProductFromCart(productId) {
    const index = cart.findIndex(item => item.productId === productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    renderCart();
}

// Checkout Functions
function cartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function pay(amount) {
    totalPaid += amount;
    const remainingBalance = totalPaid - cartTotal();
    if (remainingBalance >= 0) {
        totalPaid = 0; // Reset after successful payment
        clearCart();
        alert(`Thank you! Your change is $${remainingBalance.toFixed(2)}.`);
    } else {
        alert(`You owe $${Math.abs(remainingBalance).toFixed(2)}.`);
    }
    renderCart();
}

// Render Functions
function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear existing items
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addProductToCart(${product.productId})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

function renderCart() {
    const cartList = document.getElementById("cart-list");
    const totalDisplay = document.getElementById("total-display");
    cartList.innerHTML = ""; // Clear existing items

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
            <button onclick="increaseQuantity(${item.productId})">+</button>
            <button onclick="decreaseQuantity(${item.productId})">-</button>
            <button onclick="removeProductFromCart(${item.productId})">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });

    totalDisplay.innerText = `Total: $${cartTotal().toFixed(2)}`;
}

function clearCart() {
    cart.length = 0; // Clear the array
    renderCart();
}

// Initialize
function init() {
    renderProducts();
    renderCart();
}

document.addEventListener("DOMContentLoaded", init);
