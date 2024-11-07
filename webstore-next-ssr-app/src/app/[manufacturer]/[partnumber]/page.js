// src/app/[manufacturer]/[partnumber]/page.js

import { notFound } from 'next/navigation';

// Function to fetch product data based on manufacturer and part number
async function getProduct(manufacturer, partnumber) {
    const url = `http://kuyadoga.com:8002/api/products/?manufacturer=${encodeURIComponent(manufacturer)}&part_number=${encodeURIComponent(partnumber)}`;
    const res = await fetch(url);

    if (!res.ok) {
        console.error(`Error fetching product: ${res.statusText}`);
        return null;
    }

    const data = await res.json();
    return data.results && data.results.length > 0 ? data.results[0] : null;
}

// Dynamic metadata export for SEO
export async function generateMetadata({ params }) {
    const { manufacturer, partnumber } = params;
    const product = await getProduct(manufacturer, partnumber);

    if (!product) {
        return {
            title: 'Product Not Found - Kuyadoga',
            description: 'The product you are looking for could not be found.',
        };
    }

    return {
        title: `${product.name} - ${product.part_number} - ${product.manufacturer} | Kuyadoga`,
        description: product.description || 'Discover high-quality products from trusted manufacturers.',
        keywords: `${product.manufacturer}, ${product.part_number}, ${product.name}, buy online, secure payment`,
        openGraph: {
            title: `${product.name} - ${product.manufacturer} | Kuyadoga`,
            description: product.description || 'Discover high-quality products from trusted manufacturers.',
            images: [
                product.image ? product.image : '/kuyadoga-logo-square.jpg',
            ],
            url: `https://yourwebsite.com/${manufacturer}/${partnumber}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name} - ${product.manufacturer} | Kuyadoga`,
            description: product.description || 'Discover high-quality products from trusted manufacturers.',
            image: product.image ? product.image : '/kuyadoga-logo-square.jpg',
        },
    };
}

// Main ProductPage component
export default async function ProductPage({ params }) {
    const { manufacturer, partnumber } = params;

    // Fetch product data
    const product = await getProduct(manufacturer, partnumber);

    // If the product is not found, display a 404 page
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
                        <img src={`https://admin.kuyadoga.com${product.manufacturer_logo}`} alt={product.manufacturer} style={styles.productImage} />
                    ) : (
                        <img src="/kuyadoga-logo-square.jpg" alt="Kuyadoga Logo" style={styles.productImage} />
                    )}
                </div>

                {/* Product Details on the Right */}
                <div style={styles.details}>
                    <h1 style={styles.productName}>{product.name}</h1>
                    <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
                    <p><strong>Part Number:</strong> {product.part_number}</p>
                    <p><strong>Description:</strong> {product.description || 'No description available'}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <button style={styles.addToCartButton}>Add to Cart</button>

                    {/* Customer Reassurance Messages */}
                    <div style={styles.reassuranceContainer}>
                        <p style={styles.reassuranceText}>✔ Free Shipping on Orders Over $100</p>
                        <p style={styles.reassuranceText}>✔ 30-Day Money-Back Guarantee</p>
                        <p style={styles.reassuranceText}>✔ Secure Payment Processing</p>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div style={styles.contactFormSection}>
                <h2>Contact Us</h2>
                <form style={styles.contactForm} method="POST" action="/api/contact">
                    <label htmlFor="name" style={styles.label}>Name</label>
                    <input type="text" id="name" name="name" required style={styles.input} />

                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input type="email" id="email" name="email" required style={styles.input} />

                    <label htmlFor="message" style={styles.label}>Message</label>
                    <textarea id="message" name="message" rows="4" required style={styles.textarea}></textarea>

                    <button type="submit" style={styles.submitButton}>Send Message</button>
                </form>
            </div>
        </div>
    );
}

// Styles object for inline styling
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
    contactFormSection: {
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    },
    contactForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    label: {
        fontWeight: 'bold',
        fontSize: '1rem',
    },
    input: {
        padding: '0.5rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    textarea: {
        padding: '0.5rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    submitButton: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    },
};
