// src/lib/cart.js

import { cookies } from 'next/headers';

// Get cart data from cookies
export async function getSessionCart() {
    const cookieHeader = await cookies(); // Await cookies()
    const cartCookie = cookieHeader.get('cart')?.value;
    return cartCookie ? JSON.parse(cartCookie) : []; // Ensure it returns an array
}

// Save cart data to cookies
export function saveSessionCart(response, cart) {
    response.cookies.set('cart', JSON.stringify(cart), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });
}
