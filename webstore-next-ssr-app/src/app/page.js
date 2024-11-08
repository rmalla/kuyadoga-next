import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../lib/fetcher';

export default async function HomePage() {
    const productsData = await fetchProducts();
    const products = productsData?.results.slice(0, 16) || []; // Limit to 16 products on this page

    return (
        <ProductGrid
            products={products}
            title="Our Products1"
            style={{ maxWidth: '80%', margin: '0 auto' }}
        />
    );
}
