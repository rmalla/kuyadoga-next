import { getProduct } from './fetcher';
import { capitalizeFirstLetter } from './utils';


export async function generateProductMetadata({ params }) {
    // Ensure `params` is resolved before destructuring
    const resolvedParams = await Promise.resolve(params);
    const { manufacturer, partnumber } = resolvedParams;

    // Fetch the product data
    const product = await getProduct(manufacturer, partnumber);

    // Handle cases where product is not found
    if (!product) {
        return {
            title: 'Product Not Found - Kuyadoga',
            description: 'The product you are looking for could not be found.',
        };
    }

    // Generate metadata based on product data
    return {
        title: `${product.name} - ${product.part_number} - ${product.manufacturer} | Kuyadoga`,
        description: product.description || 'Discover high-quality products from trusted manufacturers.',
        keywords: `${product.manufacturer}, ${product.part_number}, ${product.name}, buy online, secure payment`,
        openGraph: {
            title: `${product.name} - ${product.manufacturer} | Kuyadoga`,
            description: product.description || 'Discover high-quality products from trusted manufacturers.',
            images: [product.image ? product.image : '/kuyadoga-logo-square.jpg'],
            url: `https://www.kuyadoga.com/${manufacturer}/${partnumber}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name} - ${product.manufacturer} | Kuyadoga`,
            description: product.description || 'Discover high-quality products from trusted manufacturers.',
            image: product.image ? product.image : '/kuyadoga-logo-square.jpg',
        },
    };
}

// lib/metadata.js

export function generateGeneralMetadata({ title, description, keywords, url, image }) {
    // Default values for general metadata
    const defaultTitle = 'Kuyadoga - High-Quality Products';
    const defaultDescription = 'Discover a wide range of high-quality products from trusted manufacturers.';
    const defaultKeywords = 'high-quality products, trusted manufacturers, Kuyadoga, buy online';
    const defaultImage = '/kuyadoga-logo-square.jpg';
    const defaultUrl = 'https://www.kuyadoga.com';

    return {
        title: title || defaultTitle,
        description: description || defaultDescription,
        keywords: keywords || defaultKeywords,
        openGraph: {
            title: title || defaultTitle,
            description: description || defaultDescription,
            images: [image || defaultImage],
            url: url || defaultUrl,
        },
        twitter: {
            card: 'summary_large_image',
            title: title || defaultTitle,
            description: description || defaultDescription,
            image: image || defaultImage,
        },
    };
}




export function generateManufacturerMetadata(manufacturer) {
    // Capitalize the manufacturer name before using it in metadata
    const capitalizedManufacturer = capitalizeFirstLetter(manufacturer);

    // Default values for metadata if specific data isn't available
    const defaultTitle = 'Kuyadoga - Trusted Manufacturers';
    const defaultDescription = `Explore products from top-quality manufacturers on Kuyadoga, your trusted source for high-quality products.`;
    const defaultKeywords = `${capitalizedManufacturer}, Kuyadoga, high-quality products, trusted manufacturers, buy online`;
    const defaultImage = '/kuyadoga-logo-square.jpg';
    const defaultUrl = `https://www.kuyadoga.com/manufacturer/${encodeURIComponent(capitalizedManufacturer)}`;

    // Generate metadata specifically for the manufacturer
    return {
        title: `${capitalizedManufacturer} - Products and Solutions | Kuyadoga`,
        description: `Discover the best products and solutions from ${capitalizedManufacturer} on Kuyadoga. Quality products from a trusted brand.`,
        keywords: `${capitalizedManufacturer}, products, solutions, high-quality, Kuyadoga, buy online`,
        openGraph: {
            title: `${capitalizedManufacturer} - Products and Solutions | Kuyadoga`,
            description: `Browse the finest selection of products from ${capitalizedManufacturer} on Kuyadoga.`,
            images: [defaultImage],
            url: defaultUrl,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${capitalizedManufacturer} - Products and Solutions | Kuyadoga`,
            description: `Explore high-quality products from ${capitalizedManufacturer} on Kuyadoga.`,
            image: defaultImage,
        },
    };
}
