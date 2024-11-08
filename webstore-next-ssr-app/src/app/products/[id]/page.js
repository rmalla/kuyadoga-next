// // src/app/products/[id]/page.js
//
// import { fetchProductById } from '../../../lib/fetcher';
//
// export default async function ProductDetail({ params }) {
//     const { id } = params;
//     const product = await fetchProductById(id);
//
//     if (!product) {
//         return <p>Product not found.</p>;
//     }
//
//     return (
//         <div>
//             <h1>{product.name}</h1>
//             <img
//                 src={product.image_url || '/images/logo_venexchange.png'}
//                 alt={product.name}
//                 style={{ width: '500px', height: 'auto' }}
//             />
//             <p>{product.description}</p>
//             <p>Price: ${product.price}</p>
//             <p>Manufacturer: {product.manufacturer}</p>
//             <p>Part Number: {product.part_number}</p>
//         </div>
//     );
// }
