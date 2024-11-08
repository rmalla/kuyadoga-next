import React from 'react';
import ProductCard from './ProductCard';

const styles = {
    container: {
        maxWidth: '100%',
        margin: '0 auto',
        padding: '2rem 0',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
    },
};

export default function ProductGrid({ products, title = "Our Products", style }) {
    return (
        <div style={{ ...styles.container, ...style }}>
            <h1 style={styles.heading}>{title}</h1>
            <div style={styles.productGrid}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
