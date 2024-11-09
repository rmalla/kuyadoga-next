// src/app/api/cart/add/route.js

import { NextResponse } from 'next/server';
import { getSessionCart, saveSessionCart } from '../../../../lib/cart';

export async function POST(request) {
    const { product } = await request.json();

    // Retrieve the current cart from cookies
    const cart = await getSessionCart(); // Await getSessionCart

    // Ensure `cart` is an array and find the item in the cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to cookies
    const response = NextResponse.json({ cart });
    saveSessionCart(response, cart);

    return response;
}
