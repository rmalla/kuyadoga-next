// src/lib/cart.js

import { cookies } from 'next/headers';

// Get cart data from cookies
export function getSessionCart(cookieHeader) {
    const cartCookie = cookieHeader.get('cart')?.value;
    return cartCookie ? JSON.parse(cartCookie) : [];
}

// Save cart data to cookies
export function saveSessionCart(response, cart) {
    response.cookies.set('cart', JSON.stringify(cart), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });
}
