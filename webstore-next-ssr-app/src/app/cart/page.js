// src/app/page.js

import ProductList from '../../components/ProductList';
import { fetchProducts } from '../../lib/fetcher';

export default async function HomePage() {
    let products = [];

    try {
        products = await fetchProducts();
        products = Array.isArray(products) ? products : []; // Ensure products is always an array
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    return (
        <div>
            <h1>Our Products</h1>
            <ProductList products={products} />
        </div>
    );
}
