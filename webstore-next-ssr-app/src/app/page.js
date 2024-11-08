import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../lib/fetcher';

export default async function HomePage() {

    const products = await fetchProducts({ limit: 18 });

    return (
        <ProductGrid
            products={products}
            title="Our Products"
            style={{ maxWidth: '80%', margin: '0 auto' }}
        />
    );
}
