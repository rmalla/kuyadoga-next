// app/[manufacturer]/[partnumber]/page.js

import { notFound } from 'next/navigation';

async function getProduct(manufacturer, partnumber) {
    const res = await fetch(`https://admin.kuyadoga.com/api/products/?manufacturer=${encodeURIComponent(manufacturer)}&part_number=${encodeURIComponent(partnumber)}`);
    if (!res.ok) {
        return null;
    }
    const data = await res.json();
    return data.length > 0 ? data[0] : null; // Assuming API returns an array
}

export default async function ProductPage({ params: unresolvedParams }) {
    const params = await unresolvedParams;
    const { manufacturer, partnumber } = params;

    const product = await getProduct(manufacturer, partnumber);

    if (!product) {
        notFound();
    }

    return (
        <div style={styles.container}>
            <div style={styles.productSection}>
                {/* Image on the Left */}
                <div style={styles.imageContainer}>
                    {product.image ? (
                        <img src={product.image} alt={product.name} style={styles.productImage} />
                    ) : product.manufacturer_logo ? (
                        <img src={`https://admin.kuyadoga.com/${product.manufacturer_logo}`} alt={product.manufacturer} style={styles.productImage} />
                    ) : (
                        <img src="kuyadoga-logo-square.jpg" alt="Kuyadoga Logo" style={styles.productImage} />
                    )}
                </div>

                {/* Product Details on the Right */}
                <div style={styles.details}>
                    <h1>{product.name}</h1>
                    <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
                    <p><strong>Part Number:</strong> {product.part_number}</p>
                    <p><strong>Description:</strong> {product.description || 'No description available'}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '1rem',
        maxWidth: '900px',
        margin: '0 auto',
    },
    productSection: {
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        alignItems: 'flex-start',
        marginBottom: '2rem',
    },
    imageContainer: {
        flex: '1',
        maxWidth: '400px',
    },
    productImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        border: '1px solid #ddd',
    },
    details: {
        flex: '2',
        textAlign: 'left',
        fontSize: '1rem',
        lineHeight: '1.6',
    },
};
