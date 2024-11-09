import { updateCartItemQuantity, deleteCartItem, getSessionCart } from '../../../../lib/cart';

export async function POST(req) {
    try {
        const formData = await req.formData();

        // Log form data to ensure it's being received correctly
        console.log('Form data received:', Object.fromEntries(formData.entries()));

        const deleteItem = formData.get('deleteItem');
        console.log('Delete item:', deleteItem);

        if (deleteItem) {
            // Only delete the specified item if deleteItem is present
            console.log(`Attempting to delete item with ID: ${deleteItem}`);
            await deleteCartItem(deleteItem);
            console.log(`Deleted item with ID: ${deleteItem}`);
        } else {
            // Retrieve the current cart and log it to see if it’s empty or has items
            const cart = await getSessionCart();
            console.log('Current cart before updating quantities:', cart);

            if (cart.length === 0) {
                console.log('Cart is empty, skipping quantity update.');
            } else {
                // Update quantities based on form data
                for (const item of cart) {
                    const quantity = formData.get(`quantity-${item.id}`);
                    console.log(`Checking quantity for item ID: ${item.id}, found quantity: ${quantity}`);

                    if (quantity) {
                        await updateCartItemQuantity(item.id, Number(quantity));
                        console.log(`Updated item ID: ${item.id} to quantity: ${quantity}`);
                    } else {
                        console.log(`No quantity update found for item ID: ${item.id}`);
                    }
                }
            }
        }

        // Redirect back to the cart page after processing
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
        const redirectUrl = `${baseUrl}/cart`;
        console.log('Redirecting to:', redirectUrl);

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
