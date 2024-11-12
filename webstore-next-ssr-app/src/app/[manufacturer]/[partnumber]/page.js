// src/app/[manufacturer]/[partnumber]/page.js

import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductImage from '../../../components/ProductImage';
import ContactForm from '../../../components/ContactForm';
import ProductGrid from '../../../components/ProductGrid';
import AddToCartButton from '../../../components/AddToCartButton'; // Import the client component
import { fetchProducts, getProduct } from '../../../lib/fetcher';
import { generateProductMetadata } from '../../../lib/metadata';
//
export async function generateMetadata({ params }) {
    return await generateProductMetadata({ params });
}

export default async function ProductPage({ params }) {
    const { manufacturer, partnumber } = await params;

    // Fetch the product data on the server side
    const product = await getProduct(manufacturer, partnumber);

    // If the product is not found, trigger a 404 page
    if (!product) {
        notFound();
    }

    // Fetch related products in random order
    const relatedProducts = await fetchProducts({ limit: 16, order: 'random' });

    return (
        <div style={styles.container}>

                {/* Breadcrumb navigation */}
                <nav style={styles.breadcrumb}>
                    <Link href="/">Home</Link> &gt;{' '}
                    <Link href={`/manufacturer/${encodeURIComponent(manufacturer)}`}>{product.manufacturer}</Link> &gt;{' '}
                    <Link href={`/manufacturer/${encodeURIComponent(manufacturer)}/${encodeURIComponent(partnumber)}`}>
                        {partnumber}
                    </Link> &gt;{' '}
                    <span>{product.name}</span>
                </nav>

            <div style={styles.productSection}>

                <div style={styles.imageContainer}>
                    {/* Ensuring ProductImage component receives the correct props */}
                    <ProductImage product={product} style={styles.productImage} />
                </div>

                <div style={styles.details}>
                    <h1 style={styles.productName}>{product.name}</h1>
                    <p><strong>Manufacturer:</strong> <Link href={`/manufacturer/${encodeURIComponent(manufacturer)}`}>{product.manufacturer}</Link>
                    </p>
                    <p><strong>Part Number:</strong> {product.part_number}</p>
                    <p><strong>Description:</strong> {product.description || 'No description available'}</p>
                    <p><strong>Price:</strong> {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(product.price)}</p>

                    {/* Use the client-side AddToCartButton here */}
                    <AddToCartButton product={product}/>

                    <div style={styles.reassuranceContainer}>
                        <p style={styles.reassuranceText}>✔ Free Shipping on Orders Over $100</p>
                        <p style={styles.reassuranceText}>✔ 30-Day Money-Back Guarantee</p>
                        <p style={styles.reassuranceText}>✔ Secure Payment Processing</p>
                    </div>
                </div>
            </div>

            {/* Pass product to ContactForm */}
            <ContactForm product={product} />
            <ProductGrid products={relatedProducts} title="Similar Products" />
        </div>
    );
}

const styles = {
    container: {
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    breadcrumb: {
        marginBottom: '1rem',
        fontSize: '1.2rem',
        color: '#555',
        padding: '0.7rem',
        paddingLeft: '1.3rem',
    },
    productSection: {
        display: 'flex',
        flexDirection: 'row', // Stacks image on top by default
        gap: '2rem',
        alignItems: 'center',
        marginBottom: '2rem',
        backgroundColor: '#f9f9f9',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        maxWidth: '500px',
        height: '100%', // Set a specific height to control aspect ratio
        display: 'flex',
        justifyContent: 'right',
        overflow: 'hidden',
        borderRadius: '8px',
        border: '1px solid #ddd',
        position: 'relative', // Required for "fill" layout to work
    },
    productImage: {
        display: 'block',
        height: '500px',
    },
    details: {
        width: '100%',
        textAlign: 'left',
        fontSize: '1rem',
        lineHeight: '1.6',
        position: 'relative', // Required for "fill" layout to work

    },
    productName: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
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
    '@media (min-width: 768px)': {
        productSection: {
            flexDirection: 'row', // Align image on the left on larger screens
            alignItems: 'flex-start',
        },
        imageContainer: {
            flex: '1', // Allow image container to take up space on the left
            marginRight: '2rem', // Add space between image and details
        },
        details: {
            flex: '2', // Allow details to take up remaining space
        },
    },
    '@media (max-width: 480px)': {
        container: {
            padding: '0.5rem',
        },
        productName: {
            fontSize: '1.4rem',
        },
        reassuranceText: {
            fontSize: '0.9rem',
        },
    },
};
