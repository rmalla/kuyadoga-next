import { fetchProducts } from '../lib/fetcher';
import ProductCard from '../components/ProductCard';



export default async function HomePage() {
    const productsData = await fetchProducts();
    const products = productsData?.results || []; // Default to an empty array if results is undefined
    const limitedProducts = products.slice(0, 12); // Limit to 12 products

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Our Products</h1>
            <div style={styles.productGrid}>
                {limitedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

// Define the styles object here
const styles = {
    container: {
        maxWidth: '80%',
        margin: '0 auto', // Centering the container
        padding: '2rem 0', // Optional padding for top and bottom spacing
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
