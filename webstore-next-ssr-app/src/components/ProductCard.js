// src/components/ProductCard.js

import Link from 'next/link';
import ProductImage from './ProductImage';


export default function ProductCard({ product }) {
    return (
        <div className="product-card" style={{ border: '1px solid #ddd', padding: '1rem', margin: '0.5rem' }}>

            <div>

                <Link href={`/${product.manufacturer.toLowerCase()}/${product.part_number}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <ProductImage product={product} style={{borderRadius: '8px', marginBottom: '10px'}}/>
                </Link>

                <h4>
                    <Link href={`/${product.manufacturer.toLowerCase()}/${product.part_number}`} style={{textDecoration: 'none', color: 'inherit'}}>
                        {product.name}
                    </Link>
                </h4>
                <p><Link href={`/manufacturer/${encodeURIComponent(product.manufacturer)}`}>{product.manufacturer}</Link></p>
                <p>PN: {product.part_number}</p>
                <p>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(product.price)}</p>

            </div>

        </div>
    );
}


