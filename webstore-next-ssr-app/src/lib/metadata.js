

// lib/metadata.js

import { getProduct } from './fetcher';

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
            url: `https://yourwebsite.com/${manufacturer}/${partnumber}`,
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
    const defaultUrl = 'https://yourwebsite.com';

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
