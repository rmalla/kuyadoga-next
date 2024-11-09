// src/lib/cart.js

import { cookies } from 'next/headers';

// Get cart data from cookies


export async function getSessionCart() {
    const cookieHeader = await cookies(); // Ensure cookies() is awaited
    const cartCookie = cookieHeader.get('cart')?.value;
    try {
        return cartCookie ? JSON.parse(cartCookie) : [];
    } catch (error) {
        console.error('Error parsing cart cookie:', error);
        return []; // Return an empty array if JSON parsing fails
    }
}

// Save cart data to cookies

export async function updateCartItemQuantity(itemId, quantity) {
    const cart = await getSessionCart();
    console.log('Cart before updating item quantity:', JSON.stringify(cart, null, 2));

    const itemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
    if (itemIndex >= 0) {
        console.log(`Updating item ID ${itemId} from quantity ${cart[itemIndex].quantity} to ${quantity}`);
        cart[itemIndex].quantity = quantity;
    } else {
        console.log(`Item ID ${itemId} not found in cart`);
    }

    await saveSessionCart(cart); // Ensure saveSessionCart is defined to update the cookie
    console.log('Cart after updating item quantity:', JSON.stringify(cart, null, 2));
}







export async function deleteCartItem(itemId) {
    let cart = await getSessionCart();
    cart = cart.filter(cartItem => cartItem.id !== itemId); // Remove the item with the specified ID
    await saveSessionCart(cart); // Save the updated cart back to the cookie
}



export async function saveSessionCart(cart) {
    const cookieHeader = await cookies();
    const cartJSON = JSON.stringify(cart);
    console.log('Saving updated cart to cookies:', cartJSON);

    // Attempt to set the cookie and log any issues
    try {
        cookieHeader.set('cart', cartJSON, { path: '/' });
        console.log('Cart successfully saved to cookies.');
    } catch (error) {
        console.error('Error saving cart to cookies:', error);
    }
}