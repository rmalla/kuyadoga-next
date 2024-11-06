// src/components/ProductCard.js

import Link from 'next/link';

export default function ProductCard({ product }) {
    return (
        <div className="product-card" style={{ border: '1px solid #ddd', padding: '1rem', margin: '0.5rem' }}>
            <Link href={`/products/${product.id}`}>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: '100%', height: 'auto' }}
                />
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
            </Link>
        </div>
    );
}
