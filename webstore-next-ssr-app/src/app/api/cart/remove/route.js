// src/app/api/cart/remove/route.js
import { NextResponse } from 'next/server';
import { getSessionCart } from '../../../../lib/cart';

export async function POST(request) {
    const formData = await request.formData();
    const productId = formData.get('deleteItem');

    console.log("Environment Base URL:", process.env.BASE_URL);

    console.log('Product ID to remove1:', productId);

    // Retrieve the current cart
    let cart = await getSessionCart();
    console.log('Current cart before deletion:', JSON.stringify(cart, null, 2));

    // Filter out the item with the specified ID
    cart = cart.filter(item => item.id !== Number(productId));
    console.log('Cart after deletion:', JSON.stringify(cart, null, 2));

    // Check and log the baseUrl value from the environment variable
    const baseUrl = process.env.BASE_URL || 'http://localhost:3002';
    console.log('Base URL used for redirection:', baseUrl); // Log the base URL

    const redirectUrl = `${baseUrl}/cart`;
    console.log('Full redirect URL:', redirectUrl); // Log the full redirect URL to check it

    // Use the base URL for redirection
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set('cart', JSON.stringify(cart), {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    console.log('Updated cart successfully saved to cookies after deletion.');

    return response;
}
