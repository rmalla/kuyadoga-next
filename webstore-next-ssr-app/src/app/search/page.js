import ProductGrid from '../../components/ProductGrid';
import Link from 'next/link';

// Import the function to fetch products by search query
async function getProducts(query) {
    const res = await fetch(`http://kuyadoga.com:8002/api/products/?search=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export default async function SearchResults({ searchParams }) {
    const query = searchParams.query || '';
    const productsData = query ? await getProducts(query) : null;
    const products = productsData ? productsData.results : [];

    return (
        <div style={styles.container}>
            <h2>Search Results for {query}</h2>
            {products.length > 0 ? (
                <ProductGrid
                    products={products}
                    title={`Results for "${query}"`}
                    style={{ maxWidth: '100%', margin: '0 auto' }}
                />
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        width: '70%',
        margin: '0 auto',
    },
};
