// Product Data
const products = [
    { id: 'p1', title: 'Aurora Sneakers', category: 'Footwear', price: 79.99, rating: 4.5, images: ['https://picsum.photos/seed/p1/600/400'], description: 'Comfortable everyday sneakers with breathable knit.' },
    { id: 'p2', title: 'Lumen Jacket', category: 'Apparel', price: 129.99, rating: 4.7, images: ['https://picsum.photos/seed/p2/600/400'], description: 'Water-resistant insulated jacket for cool evenings.' },
    { id: 'p3', title: 'Orbit Headphones', category: 'Electronics', price: 199.99, rating: 4.3, images: ['https://picsum.photos/seed/p3/600/400'], description: 'Active noise-cancelling wireless headphones.' },
    { id: 'p4', title: 'Terra Backpack', category: 'Accessories', price: 59.99, rating: 4.1, images: ['https://picsum.photos/seed/p4/600/400'], description: 'Durable daypack with laptop sleeve.' },
    { id: 'p5', title: 'Pixel Lamp', category: 'Home', price: 39.99, rating: 4.0, images: ['https://picsum.photos/seed/p5/600/400'], description: 'Minimal desk lamp with warm LEDs.' },
    { id: 'p6', title: 'Atlas Watch', category: 'Accessories', price: 249.99, rating: 4.8, images: ['https://picsum.photos/seed/p6/600/400'], description: 'Smartwatch with fitness tracking and notifications.' },
    { id: 'p7', title: 'Horizon Sunglasses', category: 'Accessories', price: 89.99, rating: 4.2, images: ['https://picsum.photos/seed/p7/600/400'], description: 'Polarized sunglasses for bright days.' },
    { id: 'p8', title: 'Comet Coffee Maker', category: 'Home', price: 139.99, rating: 4.4, images: ['https://picsum.photos/seed/p8/600/400'], description: 'Compact coffee machine with programmable timer.' },
    { id: 'p9', title: 'Nova Phone Case', category: 'Accessories', price: 19.99, rating: 3.9, images: ['https://picsum.photos/seed/p9/600/400'], description: 'Slim protective case with grippy texture.' },
    { id: 'p10', title: 'Echo Bluetooth Speaker', category: 'Electronics', price: 89.0, rating: 4.6, images: ['https://picsum.photos/seed/p10/600/400'], description: 'Portable speaker with powerful bass.' },
    { id: 'p11', title: 'Stride Running Shorts', category: 'Apparel', price: 29.99, rating: 4.0, images: ['https://picsum.photos/seed/p11/600/400'], description: 'Lightweight shorts with moisture-wicking fabric.' },
    { id: 'p12', title: 'Mira Yoga Mat', category: 'Fitness', price: 45.0, rating: 4.5, images: ['https://picsum.photos/seed/p12/600/400'], description: 'Non-slip yoga mat with cushioning.' },
    { id: 'p13', title: 'Auric Desk', category: 'Home', price: 299.99, rating: 4.3, images: ['https://picsum.photos/seed/p13/600/400'], description: 'Modern standing desk with cable management.' },
    { id: 'p14', title: 'Flux Keyboard', category: 'Electronics', price: 119.99, rating: 4.7, images: ['https://picsum.photos/seed/p14/600/400'], description: 'Mechanical keyboard with hot-swap switches.' },
    { id: 'p15', title: 'Nimbus Hoodie', category: 'Apparel', price: 59.99, rating: 4.4, images: ['https://picsum.photos/seed/p15/600/400'], description: 'Cozy hoodie made from recycled materials.' }
];

// State
let cart = [];

// DOM Elements
const homeSection = document.getElementById('home-section');
const shopSection = document.getElementById('shop-section');
const featuredGrid = document.getElementById('featured-grid');
const allProductsGrid = document.getElementById('all-products-grid');
const cartOverlay = document.getElementById('cart-overlay');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const toastContainer = document.getElementById('toast-container');

// Navigation
function showHome() {
    homeSection.style.display = 'block';
    shopSection.style.display = 'none';
    document.getElementById('home-link').classList.add('active');
    document.getElementById('shop-link').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showShop() {
    homeSection.style.display = 'none';
    shopSection.style.display = 'block';
    document.getElementById('home-link').classList.remove('active');
    document.getElementById('shop-link').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event Listeners
document.getElementById('logo-btn').addEventListener('click', (e) => { e.preventDefault(); showHome(); });
document.getElementById('home-link').addEventListener('click', showHome);
document.getElementById('shop-link').addEventListener('click', showShop);
document.getElementById('start-shopping-btn').addEventListener('click', showShop);
document.getElementById('browse-all-btn').addEventListener('click', (e) => { e.preventDefault(); showShop(); });

document.getElementById('cart-open-btn').addEventListener('click', () => {
    cartOverlay.classList.add('open');
    cartSidebar.classList.add('open');
});

document.getElementById('cart-close-btn').addEventListener('click', () => {
    cartOverlay.classList.remove('open');
    cartSidebar.classList.remove('open');
});

cartOverlay.addEventListener('click', () => {
    cartOverlay.classList.remove('open');
    cartSidebar.classList.remove('open');
});

// Rendering Products
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${product.images[0]}" alt="${product.title}" class="product-image">
        <div class="rating">★ ${product.rating}</div>
        <h3 class="product-title">${product.title}</h3>
        <p style="color: var(--muted); font-size: 0.9rem; margin-bottom: 16px;">${product.category}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
    `;
    return card;
}

function renderProducts() {
    // Render featured (first 3)
    featuredGrid.innerHTML = '';
    products.slice(0, 3).forEach(p => {
        featuredGrid.appendChild(createProductCard(p));
    });

    // Render all
    allProductsGrid.innerHTML = '';
    products.forEach(p => {
        allProductsGrid.appendChild(createProductCard(p));
    });
}

// Cart Logic
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`${product.title} added to cart!`);
};

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.images[0]}" alt="${item.title}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                <div style="margin-top: 8px;">
                    <button style="background: none; border: 1px solid var(--glass-border); color: #fff; padding: 2px 8px; border-radius: 4px; cursor: pointer;" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartCount.textContent = count;
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--muted); margin-top: 40px;">Your cart is empty</p>';
    }
}

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! This is a demo checkout.');
    cart = [];
    updateCartUI();
    cartOverlay.classList.remove('open');
    cartSidebar.classList.remove('open');
});

// Toast Logic
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize
renderProducts();
updateCartUI();
