// components/ProductImage.js
export default function ProductImage({ product, style }) {
    const defaultStyle = { width: '100%', height: 'auto', ...style };

    const imageUrl = product.images && product.images[0]?.image
        ? product.images[0].image
        : product.manufacturer_logo
        ? `https://admin.kuyadoga.com/${product.manufacturer_logo}`
        : '/kuyadoga-logo-square.jpg';

    const altText = product.images && product.images[0]?.image
        ? product.name
        : product.manufacturer || 'Kuyadoga Logo';

    return <img src={imageUrl} alt={altText} style={defaultStyle} />;
}
