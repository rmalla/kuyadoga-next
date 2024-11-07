// app/[manufacturer]/[partnumber]/page.js

import { notFound } from 'next/navigation';

async function getProduct(manufacturer, partnumber) {
    const res = await fetch(`https://admin.kuyadoga.com/api/products/?manufacturer=${encodeURIComponent(manufacturer)}&part_number=${encodeURIComponent(partnumber)}`);
    if (!res.ok) {
        return null;
    }
    const data = await res.json();
    return data.length > 0 ? data[0] : null; // Assuming API returns an array
}

export default async function ProductPage({ params }) {
    const { manufacturer, partnumber } = params;
    const product = await getProduct(manufacturer, partnumber);

    if (!product) {
        notFound();
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
            <p><strong>Part Number:</strong> {product.part_number}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            {/* Add additional product details here */}
        </div>
    );
}
