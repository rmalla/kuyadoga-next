import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../lib/fetcher';

import { generateGeneralMetadata } from '../lib/metadata';



export async function generateMetadata() {
    // Customize metadata as needed for the home page, or use defaults
    return generateGeneralMetadata({
        title: 'Welcome to Kuyadoga - High-Quality Products',
        description: 'Discover an extensive range of top-notch products from reputable manufacturers at Kuyadoga.',
        url: 'https://www.kuyadoga.com', // Custom URL for the home page
        image: '/images/kuyadoga-logo-square.jpg', // Optional: Specify an image for the home page
    });
}


export default async function HomePage() {

    const products = await fetchProducts({ limit: 16, order: 'random' });

    return (
        <ProductGrid
            products={products}
            title="Our Products"
            style={{ maxWidth: '80%', margin: '0 auto' }}
        />
    );
}
