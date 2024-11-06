// lib/fetcher.js

export async function fetchProducts() {
    // const response = await fetch('https://your_django_domain.com/api/products/');
    const response = await fetch('http://kuyadoga.com:8002/api/products/?limit=12');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}


export async function fetchProductById(id) {
    const response = await fetch(`http://kuyadoga.com:8002/api/products/${id}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return await response.json();
}