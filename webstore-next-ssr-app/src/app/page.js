// app/page.js

import { fetchProducts } from '../lib/fetcher';
import ProductCard from '../components/ProductCard';

export default async function HomePage() {
    const productsData = await fetchProducts();
    // console.log(products); // Check if this logs an array
    const products = productsData.results; // Access the array within the object
    const limitedProducts = products.slice(0, 12); // Limit to 12 products

    return (
        <div>
            <h1>Our Products</h1>
            <div className="product-grid">
                {limitedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
