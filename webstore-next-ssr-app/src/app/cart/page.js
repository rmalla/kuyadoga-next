// src/app/page.js

import ProductList from '../../components/ProductList';
import { fetchProducts } from '../../lib/fetcher';

export default async function HomePage() {
    const products = await fetchProducts(); // Fetch products on the server

    return (
        <div>
            <h1>Our Products1</h1>
            <ProductList products={products} />
        </div>
    );
}
