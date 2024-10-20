const productGrid = document.getElementById('product-grid');
const loadMoreBtn = document.getElementById('load-more');
let currentPage = 1;
const limit = 8; // Har safar 8 ta mahsulot yuklanadi

// FakeStoreAPI'dan mahsulotlarni olish funksiyasi
async function getProducts(page, limit) {
    const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}&page=${page}`);
    const products = await response.json();
    return products;
}

// Mahsulotlarni UI'ga yuklash funksiyasi
function displayProducts(products) {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h4>${product.title}</h4>
            <p>$${product.price}</p>
        `;

        productGrid.appendChild(productCard);
    });
}

// Birinchi mahsulotlarni yuklash
async function loadProducts() {
    const products = await getProducts(currentPage, limit);
    displayProducts(products);
}

// "See More" tugmasi bosilganda mahsulotlarni yuklash
loadMoreBtn.addEventListener('click', async () => {
    currentPage++;
    const products = await getProducts(currentPage, limit);
    displayProducts(products);
});

// Sahifa yuklanganda birinchi sahifa mahsulotlarini yuklash
window.addEventListener('DOMContentLoaded', loadProducts);
