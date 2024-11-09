// src/app/api/cart/count/route.js

import { NextResponse } from 'next/server';
import { getSessionCart } from '../../../../lib/cart';

export async function GET(request) {
    const cart = getSessionCart(request.cookies);
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0); // Sum all quantities
    return NextResponse.json({ itemCount });
}
