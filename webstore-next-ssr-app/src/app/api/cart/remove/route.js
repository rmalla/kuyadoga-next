// src/app/api/cart/remove/route.js

import { NextResponse } from 'next/server';
import { getSessionCart, saveSessionCart } from '../../../../lib/cart';

export async function POST(request) {
    const { productId } = await request.json();
    let cart = getSessionCart(request.cookies);
    cart = cart.filter(item => item.id !== productId);

    const response = NextResponse.json({ cart });
    saveSessionCart(response, cart);

    return response;
}
