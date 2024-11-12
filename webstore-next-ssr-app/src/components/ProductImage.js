import Image from 'next/image';

export default function ProductImage({ product, style }) {
    const imageUrl = product.images && product.images[0]?.image
        ? product.images[0].image
        : product.manufacturer_logo
        // ? `https://admin.kuyadoga.com${product.manufacturer_logo}`
        ? `${process.env.DJANGO_INTERNAL_API_URL}${product.manufacturer_logo}`
        : '/kuyadoga-logo-square.jpg';

    const altText = product.images && product.images[0]?.image
        ? product.name
        : product.manufacturer || 'Kuyadoga Logo';

    return (
        <div
            style={{
                width: '100%',         // Make this 100% of the container width
                height: '200px',        // Set a consistent height for images
                position: 'relative',
                overflow: 'hidden',     // Hide any overflow
                borderRadius: '8px',    // Optional: Rounded corners
                ...style,
            }}
        >
            <Image
                src={imageUrl}
                alt={altText}
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
                priority
            />
        </div>
    );
}
