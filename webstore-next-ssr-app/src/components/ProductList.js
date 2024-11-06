// src/components/ProductList.js

import ProductCard from './ProductCard';

export default function ProductList({ products }) {
    return (
        <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
