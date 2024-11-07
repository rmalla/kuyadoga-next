// src/components/ProductCard.js

import Link from 'next/link';

export default function ProductCard({ product }) {
    return (
        <div className="product-card" style={{ border: '1px solid #ddd', padding: '1rem', margin: '0.5rem' }}>
            <Link href={`/${product.manufacturer.toLowerCase()}/${product.part_number}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div>
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{width: '100%', height: 'auto'}}
                        />
                    ) : product.manufacturer_logo ? (
                        <img
                            src={`https://admin.kuyadoga.com/${product.manufacturer_logo}`}
                            alt={product.manufacturer}
                            style={{width: '100%', height: 'auto'}}
                        />
                    ) : (
                        <img
                            src="kuyadoga-logo-square.jpg"
                            alt="Kuyadoga Logo"
                            style={{width: '100%', height: 'auto'}}
                        />
                    )}

                    <h2>{product.name}</h2>
                    <p>{product.manufacturer}</p>
                    <p>{product.part_number}</p>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                </div>
            </Link>
        </div>
    );
}
