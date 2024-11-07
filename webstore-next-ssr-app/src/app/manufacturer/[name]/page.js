import Link from 'next/link';
import Pagination from '../../../components/Pagination';

async function fetchProducts(manufacturer, page = 1) {
    const limit = 15;

    // Fetch data from the API using `page` and `limit` as query parameters
    const res = await fetch(`http://kuyadoga.com:8002/api/products/?manufacturer=${encodeURIComponent(manufacturer)}&page=${page}&limit=${limit}`, {
        cache: 'no-store' // Ensures fresh data for each request
    });

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await res.json();

    // Log the API response to verify structure (useful for debugging)
    // console.log("API response:", data);

    // Return products array and calculate total pages based on `count` and `limit`
    return {
        products: Array.isArray(data.results) ? data.results : [],  // Ensure products is an array
        totalPages: Math.ceil(data.count / limit)  // Calculate total pages based on count
    };
}


export async function generateMetadata({ params }) {
    return {
        title: `${params.name} Products - Kuyadoga`,
        description: `Discover high-quality products from ${params.name}. Browse our selection of top-notch products available for purchase.`,
    };
}

export default async function ManufacturerPage({ params, searchParams }) {
    const { name } = params;
    const page = parseInt(searchParams.page) || 1; // Default to page 1 if not specified

    let data;
    try {
        data = await fetchProducts(name, page);
    } catch (error) {
        console.error("Error fetching products:", error);
        return <div style={styles.error}>Failed to load products. Please try again later.</div>;
    }

    const products = data.products || [];
    const totalPages = data.totalPages || 1;

    if (products.length === 0) {
        return <div style={styles.noProducts}>No products found for {name}.</div>;
    }

    return (
        <div style={styles.container}>
            <h1>{name} Products</h1>
            <div style={styles.productList}>
                {products.map(product => (
                    <Link href={`/${product.manufacturer.toLowerCase()}/${product.part_number}`} key={product.id}>
                        <div style={styles.productCard}>
                            <img src={(product.images && product.images[0]?.image) || '/images/kuyadoga-logo-square.jpg'} alt={product.name} style={styles.productImage} />
                            <h3>{product.name}</h3>
                            <p><strong>Part Number:</strong> {product.part_number}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>



                        {/* Pagination Component */}

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                basePath={`/manufacturer/${name}`}
            />


        </div>
    );
}

const styles = {
    container: {
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    productList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
    },
    productCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        textAlign: 'center',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    productImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
    },
    pagination: {
        marginTop: '2rem',
        textAlign: 'center',
    },
    pageLink: {
        padding: '0.5rem 1rem',
        margin: '0 0.25rem',
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#0070f3',
    },
    error: {
        textAlign: 'center',
        color: 'red',
        padding: '1rem',
    },
    noProducts: {
        textAlign: 'center',
        padding: '1rem',
        color: '#666',
    },
};
