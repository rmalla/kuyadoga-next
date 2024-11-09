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


export function saveSessionCart(cart) {
    const cookieValue = JSON.stringify(cart);
    return `cart=${cookieValue}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`;
}