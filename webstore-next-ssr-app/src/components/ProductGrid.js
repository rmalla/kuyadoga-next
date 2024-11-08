// components/ProductGrid.js
import React from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../lib/fetcher';

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

export default async function ProductGrid({ limit = 12, title = "Our Products" }) {
    const productsData = await fetchProducts();
    const products = productsData?.results || [];
    const limitedProducts = products.slice(0, limit);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>{title}</h1>
            <div style={styles.productGrid}>
                {limitedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
