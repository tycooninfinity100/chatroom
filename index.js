javascript
const products = [
    {
        id: 1,
        name: "Stylish T-Shirt",
        price: 19.99,
        image: "images/tshirt.jpg",
    },
    {
        id: 2,
        name: "Elegant Dress",
        price: 39.99,
        image: "images/dress.jpg",
    },
    {
        id: 3,
        name: "Casual Jeans",
        price: 29.99,
        image: "images/jeans.jpg",
    },
];
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} has been added to your cart.`);
        displayCartItems(); // Refresh cart display
    }
}
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    if (sectionId === 'cart') {
        displayCartItems();
    }
}
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>No items in your cart.</p>';
        return;
    }
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
        cartItemsDiv.appendChild(itemDiv);
    });
}
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to cart before checking out.");
        return;
    }
    alert("Thank you for your purchase!");
    cart = []; // Clear cart after checkout
    localStorage.removeItem('cart'); // Clear cart from local storage
    displayCartItems(); // Refresh cart display
}
window.onload = () => {
    displayProducts();
    showSection('home'); // Show home section on load
};
