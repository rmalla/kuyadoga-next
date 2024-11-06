// app/page.js

import { fetchProducts } from '../lib/fetcher';
import Link from 'next/link';

export default async function HomePage() {
    const products = await fetchProducts();
    const limitedProducts = products.slice(0, 12); // Limit to 12 products

    return (
        <div>
            <h1>Our Products</h1>
            <div className="product-grid">
                {limitedProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                        <div className="product-tile">
                            <div className="image-container">
                                <img
                                    src={product.image_url || '/images/logo_venexchange.png'}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </div>
                            <h2>{product.name}</h2>
                            <p>{product.manufacturer}</p>
                            <p>{product.part_number}</p>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
