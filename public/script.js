let products = [];
let cart = [];

fetch("/api/products")
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts();
    })
    .catch(error => {
        console.error(error);
        document.getElementById("products").innerHTML =
            "Failed to load products.";
    });

function displayProducts() {
    const container = document.getElementById("products");

    container.innerHTML = "";

    products.forEach(product => {

        let image = "";

        if (product.name === "Laptop") {
            image = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80";
        } 
        else if (product.name === "Headphones") {
            image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80";
        } 
        else if (product.name === "Keyboard") {
            image = "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80";
        } 
        else if (product.name === "Mouse") {
            image = "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500&q=80";
        }

        container.innerHTML += `
            <div class="product">

                <img src="${image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p class="price">₹${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);

    if (product) {
        cart.push(product);
        displayCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function displayCart() {

    const cartElement = document.getElementById("cart");
    const totalElement = document.getElementById("total");

    if (cart.length === 0) {
        cartElement.innerHTML = "Your cart is empty.";
        totalElement.innerText = "0";
        return;
    }

    let total = 0;

    cartElement.innerHTML = "";

    cart.forEach((product, index) => {

        total += product.price;

        cartElement.innerHTML += `
            <div class="cart-item">

                <span>
                    ${product.name} - ₹${product.price}
                </span>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    totalElement.innerText = total;
}