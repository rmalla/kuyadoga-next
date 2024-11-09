// src/app/api/cart/add/route.js

import { NextResponse } from 'next/server';
import { getSessionCart, saveSessionCart } from '../../../../lib/cart';

export async function POST(request) {
    const { product } = await request.json();

    // Retrieve the current cart from cookies
    const cart = getSessionCart(request.cookies);
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    const response = NextResponse.json({ cart });
    saveSessionCart(response, cart); // Save updated cart back to cookies

    return response;
}
