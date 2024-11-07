// app/search/page.js
import Link from 'next/link';

async function getProducts(query) {
    const res = await fetch(`http://kuyadoga.com:8002/api/products/?search=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export default async function SearchResults({ searchParams }) {
    const query = searchParams.query || '';
    const products = query ? await getProducts(query) : [];

    return (
        <div>
            <h2>Search Results for {query}</h2>
            <div style={styles.productGrid}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Link
                            href={`/${product.manufacturer.toLowerCase()}/${product.part_number}`}
                            key={product.id}
                            style={styles.link}
                        >
                            <div style={styles.productCard}>
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={styles.productImage}
                                    />
                                ) : product.manufacturer_logo ? (
                                    <img
                                        src={`https://admin.kuyadoga.com/${product.manufacturer_logo}`}
                                        alt={product.manufacturer}
                                        style={styles.productImage}
                                    />
                                ) : (
                                    <img
                                        src="kuyadoga-logo-square.jpg"
                                        alt="Kuyadoga Logo"
                                        style={styles.productImage}
                                    />
                                )}
                                <h3>{product.name}</h3>
                                <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
                                <p><strong>Part Number:</strong> {product.part_number}</p>
                                <p><strong>Price:</strong> ${product.price}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px 0',
        width: '70%',
        margin: '0 auto',
    },
    productCard: {
        border: '1px solid #ddd',
        padding: '16px',
        borderRadius: '8px',
        textAlign: 'center',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px',

    },
    productImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
};
