import { updateCartItemQuantity, deleteCartItem, getSessionCart } from '../../../../lib/cart';

export async function POST(req) {
    try {
        const formData = await req.formData();

        // Log form data for debugging
        console.log('Form data:', Object.fromEntries(formData.entries()));

        const deleteItem = formData.get('deleteItem');

        if (deleteItem) {
            // Only delete the specified item if deleteItem is present
            await deleteCartItem(deleteItem);
            console.log(`Deleted item with ID: ${deleteItem}`);
        } else {
            // Update quantities based on form data
            const cart = await getSessionCart();
            for (const item of cart) {
                const quantity = formData.get(`quantity-${item.id}`);
                if (quantity) {
                    await updateCartItemQuantity(item.id, Number(quantity));
                    console.log(`Updated item ID: ${item.id} to quantity: ${quantity}`);
                }
            }
        }

        // Redirect back to the cart page after processing
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
        const redirectUrl = `${baseUrl}/cart`;
        return new Response(null, {
            status: 303,
            headers: {
                Location: redirectUrl,
            },
        });
    } catch (error) {
        console.error('Error updating cart:', error);
        return new Response('Failed to update cart', { status: 500 });
    }
}
