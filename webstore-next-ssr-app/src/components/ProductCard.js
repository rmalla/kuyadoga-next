// src/components/ProductCard.js

import Link from 'next/link';
import ProductImage from './ProductImage';


export default function ProductCard({ product }) {
    return (
        <div className="product-card" style={{ border: '1px solid #ddd', padding: '1rem', margin: '0.5rem' }}>
            <Link href={`/${product.manufacturer.toLowerCase()}/${product.part_number}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div>


                    <ProductImage product={product} style={{ borderRadius: '8px', marginBottom: '10px' }} />




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


