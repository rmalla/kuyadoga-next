import Link from 'next/link';
import Pagination from '../../../components/Pagination';
import ProductImage from '../../../components/ProductImage';
import { fetchProductsManufacturer } from '../../../lib/fetcher';
import { capitalizeFirstLetter } from '../../../lib/utils';
import ProductGrid from '../../../components/ProductGrid';


import { generateManufacturerMetadata } from '../../../lib/metadata';





// Export generateMetadata for this page
export async function generateMetadata({ params }) {
    const { name } = await params; // Extract manufacturer name directly from params
    return generateManufacturerMetadata(name); // Pass only the name to the metadata function
}



export default async function ManufacturerPage(props) {
    // Await params and searchParams to ensure they are resolved
    const { name } = await Promise.resolve(props.params);

    const capitalizedName = capitalizeFirstLetter(name);
    const resolvedSearchParams = await Promise.resolve(props.searchParams);
    const page = parseInt(resolvedSearchParams.page) || 1; // Default to page 1 if not specified

    let data;
    try {
        data = await fetchProductsManufacturer(name, page);
    } catch (error) {
        console.error("Error fetching products:", error);
        return <div style={styles.error}>Failed to load products. Please try again later.</div>;
    }

    const products = data.products || [];
    const totalPages = data.totalPages || 1;

    if (products.length === 0) {
        return <div style={styles.noProducts}>No products found for {capitalizedName}.</div>;
    }

    return (
        <div style={styles.container}>
            <ProductGrid products={products} title={`${capitalizedName} Products`} style={{ maxWidth: '100%', margin: '0 auto' }} />
            {/* Pagination Component */}
            <Pagination currentPage={page} totalPages={totalPages} basePath={`/manufacturer/${name}`} />
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
