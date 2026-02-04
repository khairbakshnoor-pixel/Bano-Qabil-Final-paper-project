// Restaurant Data
const restaurants = [
    {
        id: 1,
        name: "Burger Palace",
        icon: "🍔",
        rating: 4.8,
        time: "20-30 min",
        tags: ["Burgers", "Fast Food", "American"],
        badge: "Top Rated",
        category: "top-rated",
        menu: [
            { name: "Classic Burger", price: 8.99 },
            { name: "Cheese Burger", price: 9.99 },
            { name: "Veggie Burger", price: 7.99 }
        ]
    },
    {
        id: 2,
        name: "Pizza Paradise",
        icon: "🍕",
        rating: 4.9,
        time: "25-35 min",
        tags: ["Pizza", "Italian", "Pasta"],
        badge: "15% OFF",
        category: "offers",
        menu: [
            { name: "Margherita Pizza", price: 12.99 },
            { name: "Pepperoni Pizza", price: 14.99 },
            { name: "Veggie Supreme", price: 13.99 }
        ]
    },
    {
        id: 3,
        name: "Sushi Station",
        icon: "🍱",
        rating: 4.7,
        time: "30-40 min",
        tags: ["Japanese", "Sushi", "Asian"],
        badge: "New",
        category: "all",
        menu: [
            { name: "California Roll", price: 11.99 },
            { name: "Salmon Nigiri", price: 13.99 },
            { name: "Tempura Box", price: 15.99 }
        ]
    },
    {
        id: 4,
        name: "Taco Fiesta",
        icon: "🌮",
        rating: 4.6,
        time: "15-25 min",
        tags: ["Mexican", "Tacos", "Burritos"],
        badge: "Fast",
        category: "fast-delivery",
        menu: [
            { name: "Beef Tacos", price: 9.99 },
            { name: "Chicken Burrito", price: 10.99 },
            { name: "Nachos Supreme", price: 8.99 }
        ]
    },
    {
        id: 5,
        name: "Healthy Bowl",
        icon: "🥗",
        rating: 4.9,
        time: "20-30 min",
        tags: ["Healthy", "Salads", "Vegan"],
        badge: "Top Rated",
        category: "top-rated",
        menu: [
            { name: "Greek Salad", price: 9.99 },
            { name: "Buddha Bowl", price: 11.99 },
            { name: "Smoothie Bowl", price: 8.99 }
        ]
    },
    {
        id: 6,
        name: "Noodle House",
        icon: "🍜",
        rating: 4.5,
        time: "25-35 min",
        tags: ["Chinese", "Noodles", "Asian"],
        badge: "20% OFF",
        category: "offers",
        menu: [
            { name: "Pad Thai", price: 10.99 },
            { name: "Ramen Bowl", price: 12.99 },
            { name: "Fried Rice", price: 9.99 }
        ]
    },
    {
        id: 7,
        name: "Dessert Dreams",
        icon: "🍰",
        rating: 4.8,
        time: "15-20 min",
        tags: ["Desserts", "Cakes", "Ice Cream"],
        badge: "Fast",
        category: "fast-delivery",
        menu: [
            { name: "Chocolate Cake", price: 6.99 },
            { name: "Ice Cream Sundae", price: 5.99 },
            { name: "Cheesecake", price: 7.99 }
        ]
    },
    {
        id: 8,
        name: "Grill Master",
        icon: "🥩",
        rating: 4.7,
        time: "30-40 min",
        tags: ["BBQ", "Steaks", "Grilled"],
        badge: "Premium",
        category: "all",
        menu: [
            { name: "Ribeye Steak", price: 24.99 },
            { name: "BBQ Ribs", price: 18.99 },
            { name: "Grilled Chicken", price: 14.99 }
        ]
    }
];

// Cart System
let cart = [];

// Load Restaurants
function loadRestaurants(filter = 'all') {
    const grid = document.getElementById('restaurantGrid');
    let filteredRestaurants = restaurants;

    if (filter !== 'all') {
        filteredRestaurants = restaurants.filter(r => r.category === filter);
    }

    grid.innerHTML = filteredRestaurants.map(restaurant => `
        <div class="restaurant-card" onclick="viewRestaurant(${restaurant.id})">
            <div class="restaurant-image">
                ${restaurant.icon}
                <div class="restaurant-badge">${restaurant.badge}</div>
            </div>
            <div class="restaurant-info">
                <h3 class="restaurant-name">${restaurant.name}</h3>
                <div class="restaurant-details">
                    <span class="rating">⭐ ${restaurant.rating}</span>
                    <span>⏱️ ${restaurant.time}</span>
                </div>
                <div class="restaurant-tags">
                    ${restaurant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Restaurants
function filterRestaurants(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    loadRestaurants(category);
}

// View Restaurant
function viewRestaurant(id) {
    const restaurant = restaurants.find(r => r.id === id);
    if (restaurant && restaurant.menu.length > 0) {
        // Add first menu item to cart as demo
        addToCart(restaurant.menu[0], restaurant.name);
    }
}

// Add to Cart
function addToCart(item, restaurantName) {
    const existingItem = cart.find(i => i.name === item.name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...item,
            restaurant: restaurantName,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${item.name} added to cart!`);
}

// Update Cart
function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">Your cart is empty</p>';
        cartTotal.style.display = 'none';
        return;
    }

    cartTotal.style.display = 'block';

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div style="color: #999; font-size: 0.9rem;">${item.restaurant}</div>
                <div style="font-weight: 600; margin-top: 0.5rem;">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                <span style="font-weight: 600;">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const total = subtotal + deliveryFee;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('grandTotal').textContent = `$${total.toFixed(2)}`;
}

// Update Quantity
function updateQuantity(itemName, change) {
    const item = cart.find(i => i.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== itemName);
        }
        updateCart();
    }
}

// Toggle Cart
function toggleCart() {
    const modal = document.getElementById('cartModal');
    const overlay = document.getElementById('cartOverlay');
    modal.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) return;
    alert('Thank you for your order! Total: ' + document.getElementById('grandTotal').textContent);
    cart = [];
    updateCart();
    toggleCart();
}

// Search Restaurants
function searchRestaurants() {
    const address = document.getElementById('addressInput').value;
    if (address.trim()) {
        document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth' });
        showNotification(`Searching restaurants near ${address}...`);
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow-hover);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

