import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductImage from '../../../components/ProductImage';
import ContactForm from '../../../components/ContactForm';
import ProductGrid from '../../../components/ProductGrid';
import { fetchProducts, getProduct } from '../../../lib/fetcher';
import { generateProductMetadata } from '../../../lib/metadata';



// Export generateMetadata for this page
export async function generateMetadata({ params }) {
    return await generateProductMetadata({ params });
}

export default async function ProductPage({ params }) {
    const { manufacturer, partnumber } = await params; // Directly access `params`

    // Fetch the product data on the server side
    const product = await getProduct(manufacturer, partnumber);

    // If the product is not found, trigger a 404 page
    if (!product) {
        notFound();
    }

    // Fetch related products in random order
    const relatedProducts = await fetchProducts({ limit: 16, order: 'random' });

    // Render the page with product details and related products
    return (
        <div style={styles.container}>
            <div style={styles.productSection}>
                <div style={styles.imageContainer}>
                    <ProductImage product={product} style={{ borderRadius: '8px', marginBottom: '10px', height: '500px', alignItems: 'flex-start' }} />
                </div>
                <div style={styles.details}>
                    <h1 style={styles.productName}>{product.name}</h1>
                    <p><strong>Manufacturer:</strong> <Link href={`/manufacturer/${encodeURIComponent(manufacturer)}`}>{product.manufacturer}</Link></p>
                    <p><strong>Part Number:</strong> {product.part_number}</p>
                    <p><strong>Description:</strong> {product.description || 'No description available'}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <button style={styles.addToCartButton}>Add to Cart</button>
                    <div style={styles.reassuranceContainer}>
                        <p style={styles.reassuranceText}>✔ Free Shipping on Orders Over $100</p>
                        <p style={styles.reassuranceText}>✔ 30-Day Money-Back Guarantee</p>
                        <p style={styles.reassuranceText}>✔ Secure Payment Processing</p>
                    </div>
                </div>
            </div>

            <ContactForm />
            <ProductGrid products={relatedProducts} title="Similar Products" />
        </div>
    );
}

// Styles object for inline styling
const styles = {
    container: {
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    productSection: {
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        alignItems: 'flex-start',
        marginBottom: '2rem',
        backgroundColor: '#f9f9f9',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
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
    productName: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    addToCartButton: {
        padding: '0.75rem 1.5rem',
        fontSize: '1.2rem',
        color: '#fff',
        backgroundColor: '#0070f3',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '1rem',
    },
    reassuranceContainer: {
        marginTop: '1.5rem',
        borderTop: '1px solid #ddd',
        paddingTop: '1rem',
        color: '#4CAF50',
    },
    reassuranceText: {
        fontSize: '1rem',
        marginBottom: '0.5rem',
    },
};
