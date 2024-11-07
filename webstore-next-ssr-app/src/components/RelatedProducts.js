// components/RelatedProducts.js
import Link from 'next/link';
import ProductImage from './ProductImage'; // Assuming you have a ProductImage component for consistent image logic

export default function RelatedProducts({ products }) {
    return (
        <div style={styles.container}>
            <h3>Related Products</h3>
            <div style={styles.productGrid}>
                {products.map((product) => (
                    <Link
                        href={`/${product.manufacturer.toLowerCase()}/${product.part_number}`}
                        key={product.id}
                        style={styles.link}
                    >
                        <div style={styles.productCard}>
                            <ProductImage product={product} style={styles.productImage} />
                            <h4>{product.name}</h4>
                            <p><strong>Part Number:</strong> {product.part_number}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '1rem 0',
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
    },
    productCard: {
        border: '1px solid #ddd',
        padding: '16px',
        borderRadius: '8px',
        textAlign: 'center',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    productImage: {
        borderRadius: '8px',
        marginBottom: '10px',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
};

