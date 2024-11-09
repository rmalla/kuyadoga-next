import { getSessionCart, saveSessionCart } from '../../../../lib/cart';

export async function POST(req) {
    try {
        const data = await req.json();
        const product = data.product;

        console.log('Product received:', product); // Debug log

        // Retrieve the current cart and ensure it’s an array
        let cart = await getSessionCart();
        if (!Array.isArray(cart)) {
            cart = []; // Ensure cart is an array
        }

        // Find the existing item in the cart
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
            console.log(`Updated quantity for item ID ${product.id}:`, existingItem.quantity);
        } else {
            cart.push({ ...product, quantity: 1 });
            console.log(`Added new item to cart:`, product);
        }

        // Prepare the updated cart cookie header
        const setCookieHeader = saveSessionCart(cart);

        // Return response with the Set-Cookie header
        return new Response('Item added to cart', {
            status: 200,
            headers: {
                'Set-Cookie': setCookieHeader,
            },
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return new Response('Failed to add item to cart', { status: 500 });
    }
}
