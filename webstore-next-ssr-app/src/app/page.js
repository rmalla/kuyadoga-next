import { fetchProducts } from '../lib/fetcher';
import ProductCard from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';



export default async function HomePage() {

    return <ProductGrid limit={12} title="Our Products" />;

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
